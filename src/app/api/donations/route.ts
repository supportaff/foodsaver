import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const donationSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  quantity: z.string().min(1),
  category: z.enum(['FOOD', 'CLOTHES', 'BOOKS']),
  itemType: z.string().min(1),
  expiresAt: z.string().nullable().optional(),
  address: z.string().min(5),
  city: z.string().min(2),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const status = searchParams.get('status') || 'AVAILABLE';
  const category = searchParams.get('category');

  const donations = await prisma.donation.findMany({
    where: {
      status: status as any,
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
      ...(category ? { category: category as any } : {}),
    },
    include: { donor: { select: { name: true, city: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(donations);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const data = donationSchema.parse(body);
    const user = session.user as any;

    const donation = await prisma.donation.create({
      data: {
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        category: data.category,
        itemType: data.itemType,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        address: data.address,
        city: data.city,
        donorId: user.id,
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input', details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
