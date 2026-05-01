'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-stone-200 bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-stone-900 hover:text-amber-700 transition-colors">
          Diary
        </Link>
        <nav className="flex items-center gap-5">
          {session ? (
            <>
              <Link
                href="/diary/new"
                className="px-4 py-1.5 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
              >
                日記を書く
              </Link>
              <Link
                href={`/${session.user.username}`}
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                {session.user.username}
              </Link>
              <Link
                href="/settings"
                className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
              >
                設定
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                ログイン
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
              >
                新規登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
