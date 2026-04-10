import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700">
          <span className="text-2xl">🌱</span> GiveSaver
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/browse" className="hover:text-green-700 transition-colors">Browse</Link>
          <Link href="/donate" className="hover:text-green-700 transition-colors">Donate</Link>
          <Link href="/how-it-works" className="hover:text-green-700 transition-colors">How It Works</Link>
          <Link href="/about" className="hover:text-green-700 transition-colors">About</Link>
        </nav>
        <Link href="/donate" className="btn-primary text-sm px-4 py-2">
          + Post Donation
        </Link>
      </div>
    </header>
  );
}
