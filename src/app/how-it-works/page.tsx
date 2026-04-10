export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">How GiveSaver Works</h1>
      <p className="text-center text-gray-500 mb-16 text-lg">A simple three-step process to connect donors with those in need.</p>

      <div className="space-y-12">
        {[
          {
            step: '01', icon: '📦', title: 'Post a Donation',
            desc: 'Any individual, restaurant, business, or institution can post a donation. Simply fill in the details — what you\'re donating, the quantity, pickup address, and for food items, an expiry time. The form takes under 2 minutes.',
            tips: ['Be specific about quantity and condition', 'Add a description so NGOs know what to expect', 'Food donations require an expiry time — keep it accurate'],
          },
          {
            step: '02', icon: '🔔', title: 'NGOs & Volunteers Are Notified',
            desc: 'Registered NGOs and verified volunteers in your city can see all available donations on the Browse page. They can filter by category, city, and item type to find what they need most.',
            tips: ['NGOs can claim a donation in one click', 'The donor is notified when a claim is made', 'Multiple NGOs compete fairly — first come, first served'],
          },
          {
            step: '03', icon: '🚗', title: 'Pickup & Distribution',
            desc: 'After claiming, the volunteer or NGO coordinates a pickup time with the donor. Once collected, the donation is marked as Collected and the items are distributed to families, shelters, or individuals who need them.',
            tips: ['Donor and recipient coordinate pickup directly', 'GiveSaver does not arrange transport', 'Status is updated to keep records transparent'],
          },
        ].map((s) => (
          <div key={s.step} className="flex gap-6 items-start">
            <div className="text-center shrink-0">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">{s.icon}</div>
              <div className="text-xs font-bold text-green-600 mt-2">STEP {s.step}</div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1">
                {s.tips.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="text-green-500 mt-0.5">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
