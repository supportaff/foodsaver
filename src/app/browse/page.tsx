import { prisma } from '@/lib/prisma';
import { DonationCard } from '@/components/DonationCard';

export const dynamic = 'force-dynamic';

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { city?: string; type?: string; status?: string };
}) {
  const { city, type, status } = searchParams;

  const donations = await prisma.donation.findMany({
    where: {
      ...(status ? { status: status as any } : { status: 'AVAILABLE' }),
      ...(city ? { city: { contains: city, mode: 'insensitive' } } : {}),
      ...(type ? { foodType: { contains: type, mode: 'insensitive' } } : {}),
    },
    include: { donor: { select: { name: true, city: true } } },
    orderBy: { expiresAt: 'asc' },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Donations</h1>
      <p className="text-gray-500 mb-8">Find available food donations near you</p>

      {/* Filters */}
      <form className="flex flex-wrap gap-3 mb-8">
        <input
          name="city"
          defaultValue={city}
          placeholder="Filter by city..."
          className="input-field max-w-[200px]"
        />
        <input
          name="type"
          defaultValue={type}
          placeholder="Food type..."
          className="input-field max-w-[200px]"
        />
        <select name="status" defaultValue={status || 'AVAILABLE'} className="input-field max-w-[180px]">
          <option value="AVAILABLE">Available</option>
          <option value="CLAIMED">Claimed</option>
          <option value="COLLECTED">Collected</option>
        </select>
        <button type="submit" className="btn-primary">
          Search
        </button>
        <a href="/browse" className="btn-secondary">
          Clear
        </a>
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
            {donations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
