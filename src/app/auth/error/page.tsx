import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Authentication Error</h1>
        <p className="text-gray-500 mb-6">Something went wrong during sign in.</p>
        <Link href="/auth/login" className="btn-primary">Try Again</Link>
      </div>
    </div>
  );
}
