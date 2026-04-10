import Link from 'next/link';
import type { Donation } from '@/lib/dummyData';
import { CATEGORY_META, STATUS_META } from '@/lib/dummyData';

export default function DonationCard({ donation }: { donation: Donation }) {
  const cat = CATEGORY_META[donation.category];
  const status = STATUS_META[donation.status];

  return (
    <div className="card hover:shadow-md transition-all flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <span className="text-2xl shrink-0 mt-0.5">{cat.emoji}</span>
          <h3 className="font-semibold text-gray-800 leading-snug">{donation.title}</h3>
        </div>
        <span className={`badge ${status.color} shrink-0`}>{status.label}</span>
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        <span className={`badge ${cat.color}`}>{cat.label}</span>
        <span className="badge bg-gray-100 text-gray-600">{donation.itemType}</span>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm line-clamp-2">{donation.description}</p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <div><span className="text-gray-400">Qty:</span> <span className="font-medium">{donation.quantity}</span></div>
        <div><span className="text-gray-400">City:</span> <span className="font-medium">{donation.city}</span></div>
        {donation.expiresAt && (
          <div className="col-span-2 text-orange-600 text-xs font-medium">⏰ {donation.expiresAt}</div>
        )}
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 border-t pt-2 flex justify-between">
        <span>📍 {donation.address} · {donation.city}</span>
        <span>{donation.postedAgo}</span>
      </div>
      <div className="text-xs text-gray-500">
        By <span className="font-medium text-gray-700">{donation.donorName}</span>
        <span className="ml-1 badge bg-gray-100 text-gray-500">{donation.donorType}</span>
      </div>

      {donation.status === 'AVAILABLE' && (
        <Link
          href={`/donate?interest=${donation.id}`}
          className="btn-primary w-full text-sm text-center mt-1"
        >
          ✋ Express Interest
        </Link>
      )}
    </div>
  );
}
