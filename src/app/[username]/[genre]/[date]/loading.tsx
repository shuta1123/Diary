export default function Loading() {
  return (
    <div>
      <div className="h-4 w-72 bg-stone-100 rounded animate-pulse mb-8" />
      <div className="flex items-start justify-between mb-6">
        <div className="h-4 w-24 bg-stone-100 rounded animate-pulse" />
      </div>
      <div className="h-9 w-2/3 bg-stone-100 rounded-lg animate-pulse mb-8" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-stone-100 rounded animate-pulse"
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    </div>
  )
}
