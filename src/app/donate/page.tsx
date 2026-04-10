'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { DONATION_CATEGORIES, ITEM_TYPES, CategoryKey } from '@/lib/donationConfig';

export default function DonatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState<CategoryKey>('FOOD');

  if (status === 'loading') return <div className="text-center py-20">Loading...</div>;
  if (!session) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 mb-4">Please sign in to donate</p>
        <Link href="/auth/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.currentTarget;
    const expiresAtVal = (form.elements.namedItem('expiresAt') as HTMLInputElement).value;
    const data = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      quantity: (form.elements.namedItem('quantity') as HTMLInputElement).value,
      category,
      itemType: (form.elements.namedItem('itemType') as HTMLSelectElement).value,
      expiresAt: expiresAtVal || null,
      address: (form.elements.namedItem('address') as HTMLInputElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
    };
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/dashboard');
    } else {
      const err = await res.json();
      setError(err.error || 'Something went wrong');
    }
    setLoading(false);
  }

  const isFoodCategory = category === 'FOOD';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a Donation</h1>
      <p className="text-gray-500 mb-8">Donate surplus food, clothes, or books to those in need</p>

      {/* Category selector */}
      <div className="flex gap-3 mb-8">
        {DONATION_CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setCategory(c.value as CategoryKey)}
            className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
              category === c.value
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl block mb-1">{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className="card">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" required placeholder={`e.g. ${category === 'FOOD' ? 'Fresh Vegetables Bundle' : category === 'CLOTHES' ? 'Winter Jackets' : 'Class 10 Textbooks'}`} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows={3} placeholder="Describe the items..." className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input name="quantity" required placeholder={category === 'FOOD' ? 'e.g. 5 kg' : category === 'CLOTHES' ? 'e.g. 10 pieces' : 'e.g. 20 books'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
              <select key={category} name="itemType" required className="input-field">
                <option value="">Select type...</option>
                {ITEM_TYPES[category].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Expiry only relevant for food */}
          {isFoodCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expires At *</label>
              <input name="expiresAt" type="datetime-local" required={isFoodCategory} className="input-field" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
            <input name="address" required placeholder="Street address" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input name="city" required placeholder="City" className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
            {loading ? 'Posting...' : `${DONATION_CATEGORIES.find(c => c.value === category)?.emoji} Post ${DONATION_CATEGORIES.find(c => c.value === category)?.label} Donation`}
          </button>
        </form>
      </div>
    </div>
  );
}
