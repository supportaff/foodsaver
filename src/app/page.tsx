import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DonationCard } from '@/components/DonationCard';

async function getStats() {
  const [totalDonations, activeDonations, totalUsers, foodCount, clothesCount, booksCount] =
    await Promise.all([
      prisma.donation.count(),
      prisma.donation.count({ where: { status: 'AVAILABLE' } }),
      prisma.user.count(),
      prisma.donation.count({ where: { category: 'FOOD',    status: 'AVAILABLE' } }),
      prisma.donation.count({ where: { category: 'CLOTHES', status: 'AVAILABLE' } }),
      prisma.donation.count({ where: { category: 'BOOKS',   status: 'AVAILABLE' } }),
    ]);
  return { totalDonations, activeDonations, totalUsers, foodCount, clothesCount, booksCount };
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
            Give More. Waste Less.<br />Help Communities.
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-2xl mx-auto">
            Donate surplus food 🍱, clothes 👕, and books 📚 to NGOs and volunteers who need them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors">
              Donate Now
            </Link>
            <Link href="/browse" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors">
              Browse Donations
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
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
        <div className="max-w-3xl mx-auto px-4 mt-8 grid grid-cols-3 gap-4">
          {[
            { emoji: '🍱', label: 'Food',    count: stats.foodCount,    cat: 'FOOD'    },
            { emoji: '👕', label: 'Clothes', count: stats.clothesCount, cat: 'CLOTHES' },
            { emoji: '📚', label: 'Books',   count: stats.booksCount,   cat: 'BOOKS'   },
          ].map((c) => (
            <Link
              key={c.cat}
              href={`/browse?category=${c.cat}`}
              className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-green-400 hover:bg-green-50 transition-all"
            >
              <span className="text-4xl mb-1">{c.emoji}</span>
              <span className="font-semibold text-gray-700">{c.label}</span>
              <span className="text-sm text-green-600 font-medium">{c.count} available</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Latest Donations</h2>
          <Link href="/browse" className="text-green-600 hover:text-green-700 font-medium">View all →</Link>
        </div>
        {donations.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-5xl mb-4">🎁</p>
            <p className="text-xl">No donations yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((d) => <DonationCard key={d.id} donation={d} />)}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-green-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📦', title: 'Post a Donation',      desc: 'List food, clothes, or books with details like quantity, type, and pickup location.' },
              { icon: '🔔', title: 'NGOs Get Notified',    desc: 'Registered NGOs and volunteers browse and claim available donations near them.' },
              { icon: '🚗', title: 'Collect & Distribute', desc: 'Volunteers pick up items and ensure they reach those who need it most.' },
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
