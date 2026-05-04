export default function Loading() {
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6">
      <div className="h-9 w-48 bg-stone-100 rounded-lg animate-pulse" />
      <div className="bg-white rounded-2xl border border-stone-100 p-6">
        <div className="h-5 w-24 bg-stone-100 rounded animate-pulse mb-1" />
        <div className="h-4 w-48 bg-stone-100 rounded animate-pulse mb-4" />
        <div className="h-20 w-full bg-stone-100 rounded-lg animate-pulse mb-3" />
        <div className="flex justify-end">
          <div className="h-8 w-20 bg-stone-100 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-red-50 p-6">
        <div className="h-5 w-36 bg-stone-100 rounded animate-pulse mb-1" />
        <div className="h-4 w-full bg-stone-100 rounded animate-pulse mb-5" />
        <div className="h-9 w-36 bg-stone-100 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}
