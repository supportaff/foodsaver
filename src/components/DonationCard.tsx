'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { timeUntilExpiry, timeAgo } from '@/lib/utils';
import { CATEGORY_COLORS, CATEGORY_EMOJI, CategoryKey } from '@/lib/donationConfig';

export type DonationWithDonor = {
  id: string;
  title: string;
  description?: string | null;
  quantity: string;
  category: string;
  itemType: string;
  expiresAt?: Date | string | null;
  status: string;
  address: string;
  city: string;
  createdAt: Date | string;
  donor: { name?: string | null; city?: string | null };
  claimedBy?: { name?: string | null } | null;
};

const statusColors: Record<string, string> = {
  AVAILABLE: 'bg-green-100 text-green-800',
  CLAIMED:   'bg-yellow-100 text-yellow-800',
  COLLECTED: 'bg-blue-100 text-blue-800',
  EXPIRED:   'bg-gray-100 text-gray-600',
};

export function DonationCard({
  donation,
  showActions,
}: {
  donation: DonationWithDonor;
  showActions?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(donation.status);

  async function handleClaim() {
    if (!session) { router.push('/auth/login'); return; }
    setLoading(true);
    const res = await fetch(`/api/donations/${donation.id}/claim`, { method: 'POST' });
    if (res.ok) { setCurrentStatus('CLAIMED'); router.refresh(); }
    setLoading(false);
  }

  async function handleStatusUpdate(status: string) {
    setLoading(true);
    await fetch(`/api/donations/${donation.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  }

  const catKey = donation.category as CategoryKey;
  const catColor = CATEGORY_COLORS[catKey] ?? 'bg-gray-100 text-gray-600';
  const catEmoji = CATEGORY_EMOJI[catKey] ?? '🎁';
  const expiry = donation.expiresAt ? timeUntilExpiry(donation.expiresAt) : null;
  const isExpiringSoon = expiry && expiry.includes('h left') && parseInt(expiry) < 6;

  return (
    <div className="card hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl shrink-0">{catEmoji}</span>
          <h3 className="font-semibold text-gray-800 text-base leading-tight truncate">{donation.title}</h3>
        </div>
        <span className={`badge ${statusColors[currentStatus] ?? statusColors.EXPIRED} shrink-0`}>
          {currentStatus}
        </span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <span className={`badge ${catColor}`}>{donation.category}</span>
        <span className="badge bg-gray-100 text-gray-600">{donation.itemType}</span>
      </div>

      {donation.description && (
        <p className="text-gray-500 text-sm line-clamp-2">{donation.description}</p>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><span className="text-gray-400">Qty:</span> <span className="font-medium">{donation.quantity}</span></div>
        <div><span className="text-gray-400">City:</span> <span className="font-medium">{donation.city}</span></div>
        {expiry && (
          <div className="col-span-2">
            <span className="text-gray-400">Expires:</span>{' '}
            <span className={`font-medium ${isExpiringSoon ? 'text-red-600' : 'text-gray-700'}`}>{expiry}</span>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-400 border-t pt-2">
        📍 {donation.address} · by {donation.donor.name ?? 'Anonymous'} · {timeAgo(donation.createdAt)}
        {donation.claimedBy && <span> · Claimed by {donation.claimedBy.name}</span>}
      </div>

      {!showActions && currentStatus === 'AVAILABLE' && (
        <button onClick={handleClaim} disabled={loading} className="btn-primary w-full mt-1 disabled:opacity-60">
          {loading ? 'Claiming...' : '✋ Claim This Donation'}
        </button>
      )}

      {showActions && (
        <div className="flex gap-2 mt-1">
          {currentStatus === 'CLAIMED' && (
            <button onClick={() => handleStatusUpdate('COLLECTED')} disabled={loading} className="btn-primary flex-1 text-sm disabled:opacity-60">
              Mark Collected
            </button>
          )}
          {currentStatus === 'AVAILABLE' && (
            <button onClick={() => handleStatusUpdate('EXPIRED')} disabled={loading} className="btn-secondary flex-1 text-sm disabled:opacity-60">
              Mark Expired
            </button>
          )}
        </div>
      )}
    </div>
  );
}
