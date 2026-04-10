import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = session.user as any;
  const { status } = await req.json();

  const donation = await prisma.donation.findUnique({ where: { id: params.id } });
  if (!donation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (donation.donorId !== user.id && user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updated = await prisma.donation.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(updated);
}
