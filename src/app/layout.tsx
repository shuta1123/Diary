import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Navbar from '@/components/Navbar'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'Diary — 日記投稿サイト',
  description: '日々の記録を、自分だけの言葉で。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#faf7f2]">
        <SessionProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
          <footer className="border-t border-stone-200 mt-16">
            <div className="mx-auto max-w-5xl px-4 py-6 flex items-center justify-between text-xs text-stone-400">
              <span>© 2026 Diary</span>
              <Link href="/privacy" className="hover:text-stone-600 transition-colors">
                プライバシーポリシー
              </Link>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
