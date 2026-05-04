export default function Loading() {
  return (
    <div>
      <div className="h-4 w-48 bg-stone-100 rounded animate-pulse mb-8" />
      <div className="mb-10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 animate-pulse" />
        <div>
          <div className="h-8 w-36 bg-stone-100 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-56 bg-stone-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-5 w-16 bg-stone-100 rounded animate-pulse mb-4" />
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-20 bg-stone-100 rounded-full animate-pulse" />
        ))}
      </div>
    </div>
  )
}
