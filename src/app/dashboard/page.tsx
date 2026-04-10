import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { DonationCard } from '@/components/DonationCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  const user = session.user as any;

  const myDonations = await prisma.donation.findMany({
    where: { donorId: user.id },
    include: {
      donor: { select: { name: true, city: true } },
      claimedBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const claimedDonations = await prisma.donation.findMany({
    where: { claimedById: user.id },
    include: { donor: { select: { name: true, city: true } } },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name ?? 'there'}! ({user.role})</p>
        </div>
        <Link href="/donate" className="btn-primary">+ New Donation</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'My Donations',  value: myDonations.length,                                            color: 'text-green-600'  },
          { label: 'Available',     value: myDonations.filter((d) => d.status === 'AVAILABLE').length,    color: 'text-blue-600'   },
          { label: 'Claimed',       value: myDonations.filter((d) => d.status === 'CLAIMED').length,      color: 'text-yellow-600' },
          { label: 'I Claimed',     value: claimedDonations.length,                                       color: 'text-purple-600' },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* My Donations */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-700 mb-4">My Donations</h2>
        {myDonations.length === 0 ? (
          <div className="card text-center py-10 text-gray-500">
            <p>No donations yet.{' '}
              <Link href="/donate" className="text-green-600 font-medium">Post one now →</Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myDonations.map((d) => (
              <DonationCard key={d.id} donation={d} showActions />
            ))}
          </div>
        )}
      </section>

      {claimedDonations.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Donations I Claimed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {claimedDonations.map((d) => (
              <DonationCard key={d.id} donation={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
