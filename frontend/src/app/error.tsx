'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">
            We&apos;re sorry, but something unexpected happened. Please try again.
          </p>
          <div className="space-y-4">
            <button
              onClick={reset}
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors mr-4"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Home
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>Dr. Ajay Krishna Murthy - Oculoplasty Specialist</p>
            {error.digest && (
              <p className="mt-2 font-mono text-xs">Error ID: {error.digest}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 