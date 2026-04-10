import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About GiveSaver</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <p className="text-lg">
          GiveSaver is a social-impact platform that bridges the gap between people who have
          surplus items and communities that need them. We believe no food should go to waste,
          no book should gather dust, and no piece of clothing should be thrown away when someone
          else needs it.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mt-8">Our Mission</h2>
        <p>
          To build a sustainable, community-driven ecosystem where surplus becomes support.
          We connect donors — individuals, restaurants, businesses, and institutions — with
          verified NGOs and volunteer networks who distribute donations to those who need them most.
        </p>
        <h2 className="text-2xl font-bold text-gray-800">What We Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { emoji: '🍱', title: 'Food', desc: 'Cooked meals, vegetables, fruits, packaged goods, grains — anything safe and edible.' },
            { emoji: '👕', title: 'Clothes', desc: 'Clean, wearable clothing for all ages — from everyday wear to winter clothing and footwear.' },
            { emoji: '📚', title: 'Books', desc: 'School textbooks, story books, reference materials, activity books, and more.' },
          ].map((c) => (
            <div key={c.title} className="card text-center">
              <div className="text-4xl mb-2">{c.emoji}</div>
              <h3 className="font-bold text-gray-800 mb-1">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
        <ul className="space-y-2">
          {[
            '🌟 Dignity – Every donation is made with respect for the recipient.',
            '🔒 Safety – Donors affirm items are safe and fit for use.',
            '🤝 Community – We build bridges, not charity pipelines.',
            '♻️ Sustainability – Reducing waste is at the heart of what we do.',
          ].map((v) => <li key={v} className="text-gray-600">{v}</li>)}
        </ul>
        <div className="flex gap-4 mt-8">
          <Link href="/donate" className="btn-primary">Start Donating</Link>
          <Link href="/browse" className="btn-secondary">Browse Donations</Link>
        </div>
      </div>
    </div>
  );
}
