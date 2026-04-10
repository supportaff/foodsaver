'use client';

import { useState } from 'react';

const CATEGORIES = [
  { value: 'FOOD',    label: 'Food',    emoji: '🍱', placeholder: 'e.g. Fresh vegetables, cooked meals' },
  { value: 'CLOTHES', label: 'Clothes', emoji: '👕', placeholder: 'e.g. Winter jackets, children\'s wear' },
  { value: 'BOOKS',   label: 'Books',   emoji: '📚', placeholder: 'e.g. CBSE textbooks, story books' },
];

const ITEM_TYPES: Record<string, string[]> = {
  FOOD:    ['Cooked Food', 'Vegetables', 'Fruits', 'Bakery', 'Dairy', 'Grains & Pulses', 'Packaged Food', 'Other Food'],
  CLOTHES: ["Men's Wear", "Women's Wear", "Children's Wear", 'Winter Wear', 'Footwear', 'Accessories', 'Other Clothes'],
  BOOKS:   ['Textbooks', 'Story Books', 'Children Books', 'Religious Books', 'Reference Books', 'Magazines', 'Other Books'],
};

export default function DonatePage() {
  const [category, setCategory] = useState('FOOD');
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const cat = CATEGORIES.find((c) => c.value === category)!;

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Donation Posted!</h2>
        <p className="text-gray-500 mb-8">Thank you for your generosity. NGOs and volunteers in your area will be notified.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => setSubmitted(false)} className="btn-secondary">Post Another</button>
          <a href="/browse" className="btn-primary">Browse Donations</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Post a Donation</h1>
      <p className="text-gray-500 mb-8">Donate surplus food, clothes, or books to those in need</p>

      {/* Category Selector */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`py-4 rounded-xl border-2 font-semibold text-sm transition-all ${
              category === c.value
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'
            }`}
          >
            <span className="text-3xl block mb-1">{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className="card">
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input required placeholder={cat.placeholder} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} placeholder="Describe the items in detail..." className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input required placeholder={category === 'FOOD' ? 'e.g. 5 kg' : category === 'CLOTHES' ? 'e.g. 10 pieces' : 'e.g. 20 books'} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
              <select required className="input-field">
                <option value="">Select type...</option>
                {ITEM_TYPES[category].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {category === 'FOOD' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry / Best Before *</label>
              <input type="datetime-local" required className="input-field" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <input required placeholder="Full name or organisation" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
            <input required placeholder="+91 XXXXX XXXXX" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
            <input required placeholder="Street address" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input required placeholder="City" className="input-field" />
          </div>

          {/* Terms Agreement */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 shrink-0"
              />
              <span className="text-sm text-amber-800">
                I confirm that the donated items are safe, hygienic, and fit for use.
                I have read and agree to the{' '}
                <a href="/terms" target="_blank" className="underline font-medium">Terms &amp; Conditions</a>{' '}
                and{' '}
                <a href="/disclaimer" target="_blank" className="underline font-medium">Disclaimer</a>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!agreed}
            className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cat.emoji} Post {cat.label} Donation
          </button>
        </form>
      </div>
    </div>
  );
}
