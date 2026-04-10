'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-5xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You&apos;re registered! (Demo)</h2>
        <p className="text-gray-500 mb-6">In the live version this would create your account.</p>
        <Link href="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
      <p className="text-gray-500 mb-8">Join GiveSaver and start making a difference</p>
      <div className="card">
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input required placeholder="Your name" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" required placeholder="you@example.com" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input type="password" required placeholder="Min. 8 characters" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
            <select required className="input-field">
              <option value="">Select your role...</option>
              <option value="DONOR">Donor (Individual / Business)</option>
              <option value="NGO">NGO / Volunteer Organisation</option>
              <option value="VOLUNTEER">Individual Volunteer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input required placeholder="Your city" className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full py-3">Register (Demo)</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account? <Link href="/auth/login" className="text-green-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
