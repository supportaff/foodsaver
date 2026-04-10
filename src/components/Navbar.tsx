'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-600">
          🌱 FoodSaver
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/browse" className="text-gray-600 hover:text-green-600 font-medium">Browse</Link>
          <Link href="/donate" className="text-gray-600 hover:text-green-600 font-medium">Donate</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-green-600 font-medium">Dashboard</Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn-secondary text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary text-sm">Sign In</Link>
              <Link href="/auth/register" className="btn-primary text-sm">Register</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          <Link href="/browse" className="text-gray-700">Browse</Link>
          <Link href="/donate" className="text-gray-700">Donate</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-700">Dashboard</Link>
              <button onClick={() => signOut()} className="text-left text-red-600">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700">Sign In</Link>
              <Link href="/auth/register" className="text-gray-700">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
