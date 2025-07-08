export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading...</p>
        <p className="text-gray-500 text-sm mt-2">Dr. Ajay Krishna Murthy</p>
      </div>
    </div>
  );
} 