import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-amber-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Go Back Home
            </Link>
            <div className="text-sm text-gray-500">
              <p>Dr. Ajay Krishna Murthy - Oculoplasty Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 