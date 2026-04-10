import { prisma } from '@/lib/prisma';
import { DonationCard } from '@/components/DonationCard';
import { DONATION_CATEGORIES } from '@/lib/donationConfig';

export const dynamic = 'force-dynamic';

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; category?: string; status?: string }>;
}) {
  const { city, category, status } = await searchParams;

  const donations = await prisma.donation.findMany({
    where: {
      ...(status ? { status: status as any } : { status: 'AVAILABLE' }),
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
      ...(category ? { category: category as any } : {}),
    },
    include: { donor: { select: { name: true, city: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Donations</h1>
      <p className="text-gray-500 mb-8">Find available food, clothes, and books near you</p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <a
          href="/browse"
          className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors ${
            !category ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'
          }`}
        >
          All
        </a>
        {DONATION_CATEGORIES.map((c) => (
          <a
            key={c.value}
            href={`/browse?category=${c.value}${city ? `&city=${city}` : ''}`}
            className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors ${
              category === c.value
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'
            }`}
          >
            {c.emoji} {c.label}
          </a>
        ))}
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 mb-8">
        {category && <input type="hidden" name="category" value={category} />}
        <input
          name="city"
          defaultValue={city}
          placeholder="Filter by city..."
          className="input-field max-w-[200px]"
        />
        <select name="status" defaultValue={status || 'AVAILABLE'} className="input-field max-w-[180px]">
          <option value="AVAILABLE">Available</option>
          <option value="CLAIMED">Claimed</option>
          <option value="COLLECTED">Collected</option>
        </select>
        <button type="submit" className="btn-primary">Search</button>
        <a href="/browse" className="btn-secondary">Clear</a>
      </form>

      {donations.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl">No donations found matching your search.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{donations.length} donation(s) found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((d) => <DonationCard key={d.id} donation={d} />)}
          </div>
        </>
      )}
    </div>
  );
}
