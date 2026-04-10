import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <span className="text-2xl">🌱</span> GiveSaver
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting donors with NGOs to reduce waste and support communities across India.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/browse" className="hover:text-white transition-colors">Browse Donations</Link></li>
            <li><Link href="/donate" className="hover:text-white transition-colors">Post a Donation</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/browse?category=FOOD" className="hover:text-white transition-colors">🍱 Food</Link></li>
            <li><Link href="/browse?category=CLOTHES" className="hover:text-white transition-colors">👕 Clothes</Link></li>
            <li><Link href="/browse?category=BOOKS" className="hover:text-white transition-colors">📚 Books</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} GiveSaver. Built with ❤️ to reduce waste and help communities.
      </div>
    </footer>
  );
}
