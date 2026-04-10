import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodSaver - Reduce Food Waste, Feed Communities',
  description:
    'Connect food donors with NGOs and volunteers to reduce food waste and fight hunger.',
  keywords: 'food donation, food waste, NGO, volunteers, food rescue',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <footer className="bg-gray-800 text-gray-300 py-8 text-center text-sm">
            <p>© 2026 FoodSaver · Reducing food waste, one meal at a time 🌱</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
