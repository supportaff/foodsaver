import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const user = session.user as any;
  const donation = await prisma.donation.findUnique({ where: { id } });

  if (!donation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (donation.status !== 'AVAILABLE') {
    return NextResponse.json({ error: 'Donation is no longer available' }, { status: 409 });
  }
  if (donation.donorId === user.id) {
    return NextResponse.json({ error: 'Cannot claim your own donation' }, { status: 400 });
  }

  const updated = await prisma.donation.update({
    where: { id },
    data: { status: 'CLAIMED', claimedById: user.id },
  });

  return NextResponse.json(updated);
}
