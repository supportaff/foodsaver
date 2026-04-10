import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DonationCard } from '@/components/DonationCard';

async function getStats() {
  const [totalDonations, activeDonations, totalUsers] = await Promise.all([
    prisma.donation.count(),
    prisma.donation.count({ where: { status: 'AVAILABLE' } }),
    prisma.user.count(),
  ]);
  return { totalDonations, activeDonations, totalUsers };
}

async function getRecentDonations() {
  return prisma.donation.findMany({
    where: { status: 'AVAILABLE' },
    include: { donor: { select: { name: true, city: true } } },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
}

export default async function HomePage() {
  const [stats, donations] = await Promise.all([getStats(), getRecentDonations()]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🌱 Reduce Food Waste.<br />Feed Communities.
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-2xl mx-auto">
            Connect surplus food with NGOs and volunteers who can put it to good use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors">
              Donate Food
            </Link>
            <Link href="/browse" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors">
              Browse Donations
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-green-600">{stats.totalDonations}</p>
            <p className="text-gray-600 mt-1">Total Donations</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">{stats.activeDonations}</p>
            <p className="text-gray-600 mt-1">Available Now</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">{stats.totalUsers}</p>
            <p className="text-gray-600 mt-1">Community Members</p>
          </div>
        </div>
      </section>

      {/* Recent Donations */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Available Donations</h2>
          <Link href="/browse" className="text-green-600 hover:text-green-700 font-medium">
            View all →
          </Link>
        </div>
        {donations.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-xl">No donations available yet. Be the first to donate!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-green-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📦', title: 'Post Surplus Food', desc: 'Donors list available food with details like quantity, type, and pickup location.' },
              { icon: '🔔', title: 'NGOs Get Notified', desc: 'Registered NGOs and volunteers browse and claim available donations near them.' },
              { icon: '🚗', title: 'Collect & Distribute', desc: 'Volunteers pick up the food and ensure it reaches those who need it most.' },
            ].map((step) => (
              <div key={step.title} className="text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
