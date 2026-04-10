'use client';

import { useState } from 'react';
import DonationCard from '@/components/DonationCard';
import { DONATIONS, CATEGORY_META } from '@/lib/dummyData';

export default function BrowsePage() {
  const [category, setCategory] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('AVAILABLE');

  const filtered = DONATIONS.filter((d) => {
    const matchCat    = category === 'ALL' || d.category === category;
    const matchStatus = status   === 'ALL' || d.status   === status;
    const matchSearch = !search  || d.title.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Browse Donations</h1>
      <p className="text-gray-500 mb-8">Find available food, clothes, and books near you</p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[['ALL', '🌟', 'All'], ...Object.entries(CATEGORY_META).map(([k, v]) => [k, v.emoji, v.label])].map(([key, emoji, label]) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors ${
              category === key
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or city..."
          className="input-field max-w-[260px]"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field max-w-[180px]">
          <option value="ALL">All Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="CLAIMED">Claimed</option>
          <option value="COLLECTED">Collected</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">No donations match your search.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-4">{filtered.length} donation(s) found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d) => <DonationCard key={d.id} donation={d} />)}
          </div>
        </>
      )}
    </div>
  );
}
