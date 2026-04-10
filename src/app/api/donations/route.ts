import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const donationSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  quantity: z.string().min(1),
  foodType: z.string().min(1),
  expiresAt: z.string().datetime({ offset: true }).or(z.string()),
  address: z.string().min(5),
  city: z.string().min(2),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const status = searchParams.get('status') || 'AVAILABLE';

  const donations = await prisma.donation.findMany({
    where: {
      status: status as any,
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
    },
    include: { donor: { select: { name: true, city: true } } },
    orderBy: { expiresAt: 'asc' },
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
        ...data,
        expiresAt: new Date(data.expiresAt),
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
