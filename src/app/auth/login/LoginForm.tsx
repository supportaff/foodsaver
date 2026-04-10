'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="card text-center py-8">
      <p className="text-2xl mb-2">👋</p>
      <p className="font-semibold text-gray-800">Demo mode – no auth required</p>
      <Link href="/" className="btn-primary mt-4 inline-block">Go Home</Link>
    </div>
  );
  return (
    <div className="card">
      <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" required placeholder="you@example.com" className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" required placeholder="••••••••" className="input-field" />
        </div>
        <button type="submit" className="btn-primary w-full py-3">Sign In (Demo)</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-5">
        No account? <Link href="/auth/register" className="text-green-600 font-medium hover:underline">Register here</Link>
      </p>
    </div>
  );
}
