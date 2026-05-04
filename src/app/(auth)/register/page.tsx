'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    router.push('/')
    router.refresh()
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">新規登録</h1>
        <p className="text-stone-500 text-sm">日記を書き始めましょう</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">ユーザー名</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">メールアドレス</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">パスワード</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="8文字以上"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={agreedToPrivacy}
              onChange={(e) => setAgreedToPrivacy(e.target.checked)}
              className="mt-0.5 accent-amber-700"
            />
            <span className="text-sm text-stone-600">
              <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">
                プライバシーポリシー
              </Link>
              を読み、同意します
            </span>
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || !agreedToPrivacy}
            className="w-full py-2.5 rounded-lg bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors disabled:opacity-50"
          >
            {loading ? '登録中…' : '登録する'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-400 mt-6">
          すでにアカウントをお持ちの方は{' '}
          <Link href="/login" className="text-amber-700 hover:underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  )
}
