export default function Loading() {
  return (
    <div>
      <div className="mb-10">
        <div className="h-10 w-48 bg-stone-100 rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-56 bg-stone-100 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-stone-100 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-stone-100" />
              <div className="h-4 w-24 bg-stone-100 rounded" />
            </div>
            <div className="h-3 w-full bg-stone-100 rounded mb-1.5" />
            <div className="h-3 w-16 bg-stone-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
