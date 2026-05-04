export default function Loading() {
  return (
    <div>
      <div className="h-4 w-64 bg-stone-100 rounded animate-pulse mb-8" />
      <div className="h-9 w-32 bg-stone-100 rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-5 bg-white rounded-xl border border-stone-100 animate-pulse">
            <div className="h-3 w-24 bg-stone-100 rounded mb-2" />
            <div className="h-5 w-full bg-stone-100 rounded mb-1" />
            <div className="h-5 w-2/3 bg-stone-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
