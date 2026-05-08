export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-600 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-lg skeleton" />
              <div>
                <div className="w-48 h-6 bg-white/20 rounded skeleton mb-2" />
                <div className="w-32 h-4 bg-white/10 rounded skeleton" />
              </div>
            </div>
            <div className="text-right">
              <div className="w-24 h-4 bg-white/20 rounded skeleton mb-2" />
              <div className="w-36 h-6 bg-white/30 rounded skeleton" />
            </div>
          </div>

          {/* Verification Status Skeleton */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full skeleton" />
              <div className="flex-1">
                <div className="w-48 h-6 bg-white/30 rounded skeleton mb-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-24 h-3 bg-white/10 rounded skeleton" />
                      <div className="w-full h-4 bg-white/20 rounded skeleton" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PDF Viewer Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-48 h-6 bg-gray-200 rounded skeleton" />
            <div className="flex gap-2">
              <div className="w-24 h-10 bg-gray-200 rounded skeleton" />
              <div className="w-24 h-10 bg-gray-200 rounded skeleton" />
            </div>
          </div>
          
          {/* PDF Page Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-8">
                <div className="space-y-3">
                  <div className="w-full h-4 bg-gray-200 rounded skeleton" />
                  <div className="w-3/4 h-4 bg-gray-200 rounded skeleton" />
                  <div className="w-full h-4 bg-gray-200 rounded skeleton" />
                  <div className="w-1/2 h-4 bg-gray-200 rounded skeleton" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="bg-slate-900 text-gray-300 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-gray-700">
            <div className="w-48 h-6 bg-gray-700 rounded skeleton mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="w-32 h-4 bg-gray-700 rounded skeleton mb-2" />
                <div className="w-full h-12 bg-gray-800 rounded skeleton" />
              </div>
              <div className="space-y-3">
                <div className="w-full h-16 bg-gray-700 rounded skeleton" />
                <div className="w-full h-12 bg-gray-700 rounded skeleton" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
