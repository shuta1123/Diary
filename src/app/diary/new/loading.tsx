export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="h-9 w-36 bg-stone-100 rounded-lg animate-pulse mb-8" />
      <div className="flex flex-col gap-6">
        <div>
          <div className="h-4 w-16 bg-stone-100 rounded animate-pulse mb-1" />
          <div className="h-9 w-full bg-stone-100 rounded-lg animate-pulse" />
        </div>
        <div>
          <div className="h-4 w-20 bg-stone-100 rounded animate-pulse mb-1" />
          <div className="h-9 w-full bg-stone-100 rounded-lg animate-pulse" />
        </div>
        <div>
          <div className="h-4 w-12 bg-stone-100 rounded animate-pulse mb-1" />
          <div className="h-64 w-full bg-stone-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
