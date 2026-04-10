'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { timeUntilExpiry, timeAgo } from '@/lib/utils';

type DonationWithDonor = {
  id: string;
  title: string;
  description?: string | null;
  quantity: string;
  foodType: string;
  expiresAt: Date | string;
  status: string;
  address: string;
  city: string;
  createdAt: Date | string;
  donor: { name?: string | null; city: string };
  claimedBy?: { name?: string | null } | null;
};

const statusColors: Record<string, string> = {
  AVAILABLE: 'bg-green-100 text-green-800',
  CLAIMED: 'bg-yellow-100 text-yellow-800',
  COLLECTED: 'bg-blue-100 text-blue-800',
  EXPIRED: 'bg-gray-100 text-gray-600',
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
  const [claimed, setClaimed] = useState(donation.status);

  async function handleClaim() {
    if (!session) { router.push('/auth/login'); return; }
    setLoading(true);
    const res = await fetch(`/api/donations/${donation.id}/claim`, { method: 'POST' });
    if (res.ok) {
      setClaimed('CLAIMED');
      router.refresh();
    }
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

  const expiry = timeUntilExpiry(donation.expiresAt);
  const isExpiringSoon = expiry.includes('h left') && parseInt(expiry) < 6;

  return (
    <div className="card hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 text-lg leading-tight">{donation.title}</h3>
        <span className={`badge ${statusColors[claimed] || statusColors.EXPIRED} ml-2 shrink-0`}>
          {claimed}
        </span>
      </div>

      {donation.description && (
        <p className="text-gray-500 text-sm line-clamp-2">{donation.description}</p>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><span className="text-gray-400">Qty:</span> <span className="font-medium">{donation.quantity}</span></div>
        <div><span className="text-gray-400">Type:</span> <span className="font-medium">{donation.foodType}</span></div>
        <div><span className="text-gray-400">City:</span> <span className="font-medium">{donation.city}</span></div>
        <div>
          <span className="text-gray-400">Expires:</span>{' '}
          <span className={`font-medium ${isExpiringSoon ? 'text-red-600' : 'text-gray-700'}`}>
            {expiry}
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-400 border-t pt-2">
        📍 {donation.address} · by {donation.donor.name || 'Anonymous'} · {timeAgo(donation.createdAt)}
        {donation.claimedBy && <span> · Claimed by {donation.claimedBy.name}</span>}
      </div>

      {/* Action buttons */}
      {!showActions && claimed === 'AVAILABLE' && (
        <button
          onClick={handleClaim}
          disabled={loading}
          className="btn-primary w-full mt-1 disabled:opacity-60"
        >
          {loading ? 'Claiming...' : '✋ Claim This Donation'}
        </button>
      )}

      {showActions && (
        <div className="flex gap-2 mt-1">
          {claimed === 'CLAIMED' && (
            <button
              onClick={() => handleStatusUpdate('COLLECTED')}
              disabled={loading}
              className="btn-primary flex-1 text-sm disabled:opacity-60"
            >
              Mark Collected
            </button>
          )}
          {claimed === 'AVAILABLE' && (
            <button
              onClick={() => handleStatusUpdate('EXPIRED')}
              disabled={loading}
              className="btn-secondary flex-1 text-sm disabled:opacity-60"
            >
              Mark Expired
            </button>
          )}
        </div>
      )}
    </div>
  );
}
