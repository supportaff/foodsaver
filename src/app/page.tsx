import Link from 'next/link';
import DonationCard from '@/components/DonationCard';
import { DONATIONS, STATS, CATEGORY_META } from '@/lib/dummyData';

export default function HomePage() {
  const recent = DONATIONS.filter((d) => d.status === 'AVAILABLE').slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🌟 Trusted by {STATS.ngoPartners} NGOs across {STATS.citiesCovered} cities
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Give More. Waste Less.<br />Help Communities.
          </h1>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Donate surplus food 🍱, clothes 👕, and books 📚 to NGOs and volunteers
            who deliver them to those in need.
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

      {/* Stats Bar */}
      <section className="bg-green-700 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { label: 'Total Donations',  value: STATS.totalDonations },
            { label: 'Available Now',    value: STATS.activeDonations },
            { label: 'NGO Partners',     value: STATS.ngoPartners },
            { label: 'Cities Covered',   value: STATS.citiesCovered },
            { label: 'Lives Impacted',   value: `${STATS.livesImpacted}+` },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-green-200 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="bg-white border-b py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center text-lg font-semibold text-gray-600 mb-6">What would you like to donate?</h2>
          <div className="grid grid-cols-3 gap-4">
            {(Object.entries(CATEGORY_META) as [string, typeof CATEGORY_META[keyof typeof CATEGORY_META]][]).map(([key, c]) => (
              <Link
                key={key}
                href={`/browse?category=${key}`}
                className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 hover:border-green-400 hover:bg-green-50 transition-all group"
              >
                <span className="text-5xl mb-2 group-hover:scale-110 transition-transform">{c.emoji}</span>
                <span className="font-bold text-gray-700">{c.label}</span>
                <span className="text-sm text-green-600 font-medium mt-1">{c.count} available</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Donations */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Latest Donations</h2>
            <p className="text-gray-500 text-sm mt-1">Freshly listed – claim before they&apos;re gone!</p>
          </div>
          <Link href="/browse" className="btn-secondary text-sm">View All →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((d) => <DonationCard key={d.id} donation={d} />)}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-green-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '📦', step: '01', title: 'Post a Donation',      desc: 'List food, clothes, or books with quantity, type, and pickup location. Takes less than 2 minutes.' },
              { icon: '🔔', step: '02', title: 'NGOs Get Notified',    desc: 'Verified NGOs and volunteers nearby see your listing and can claim it immediately.' },
              { icon: '🚗', step: '03', title: 'Collect & Distribute', desc: 'Volunteers coordinate pickup and ensure items reach families and individuals who need them.' },
            ].map((s) => (
              <div key={s.title} className="text-center bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-xs font-bold text-green-500 mb-2">STEP {s.step}</div>
                <div className="text-5xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-amber-50 border-y border-amber-200 py-6 px-4">
        <div className="max-w-4xl mx-auto flex gap-3 items-start">
          <span className="text-2xl shrink-0">⚠️</span>
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> GiveSaver is a platform to connect donors with recipients.
            We do not verify the quality, safety, or condition of donated items.
            Donors and recipients are solely responsible for ensuring items are safe and appropriate.
            <Link href="/disclaimer" className="underline ml-1 font-medium">Read full disclaimer →</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
