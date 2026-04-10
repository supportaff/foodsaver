'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DonatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (status === 'loading') return <div className="text-center py-20">Loading...</div>;
  if (!session) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 mb-4">Please sign in to donate food</p>
        <Link href="/auth/login" className="btn-primary">
          Sign In
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      quantity: (form.elements.namedItem('quantity') as HTMLInputElement).value,
      foodType: (form.elements.namedItem('foodType') as HTMLSelectElement).value,
      expiresAt: (form.elements.namedItem('expiresAt') as HTMLInputElement).value,
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

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Donate Food</h1>
      <p className="text-gray-500 mb-8">List your surplus food so NGOs and volunteers can claim it</p>

      <div className="card">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Title *</label>
            <input name="title" required placeholder="e.g. Fresh Vegetables Bundle" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows={3} placeholder="Describe the food items..." className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input name="quantity" required placeholder="e.g. 5 kg, 20 servings" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Type *</label>
              <select name="foodType" required className="input-field">
                <option value="">Select type...</option>
                <option>Cooked Food</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Bakery</option>
                <option>Dairy</option>
                <option>Grains & Pulses</option>
                <option>Packaged Food</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expires At *</label>
            <input name="expiresAt" type="datetime-local" required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
            <input name="address" required placeholder="Street address" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input name="city" required placeholder="City" className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
            {loading ? 'Posting...' : '🍽️ Post Donation'}
          </button>
        </form>
      </div>
    </div>
  );
}
