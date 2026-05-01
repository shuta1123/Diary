import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-8xl font-serif font-bold text-stone-200 mb-4">404</p>
      <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">ページが見つかりません</h1>
      <p className="text-stone-500 text-sm mb-8">URLが間違っているか、削除されたページです。</p>
      <Link
        href="/"
        className="px-5 py-2 rounded-lg bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
      >
        ホームへ戻る
      </Link>
    </div>
  )
}
