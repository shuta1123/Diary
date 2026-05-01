'use client'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-6xl font-serif font-bold text-stone-200 mb-4">!</p>
      <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">エラーが発生しました</h1>
      <p className="text-stone-500 text-sm mb-8">しばらく待ってから再試行してください。</p>
      <button
        onClick={reset}
        className="px-5 py-2 rounded-lg bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
      >
        再試行
      </button>
    </div>
  )
}
