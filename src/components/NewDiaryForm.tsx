'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { getLocalDatePath, getPlainTextFromHtml } from '@/lib/diary'
import GenreInput from '@/components/GenreInput'

const DiaryEditor = dynamic(() => import('@/components/DiaryEditor'), { ssr: false })

type Props = {
  username: string
  genres: string[]
}

export default function NewDiaryForm({ username, genres }: Props) {
  const router = useRouter()
  const today = getLocalDatePath()
  const [form, setForm] = useState({ title: '', genre: '', date: today, content: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!getPlainTextFromHtml(form.content)) {
      setError('本文を入力してください')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? '投稿に失敗しました')
        setLoading(false)
        return
      }

      router.push(`/${username}/${encodeURIComponent(data.genre)}/${data.datePath}`)
      router.refresh()
    } catch {
      setError('通信に失敗しました')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">タイトル</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          placeholder="今日のタイトル"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">ジャンル</label>
        <GenreInput
          value={form.genre}
          onChange={(v) => setForm({ ...form, genre: v })}
          genres={genres}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">本文</label>
        <DiaryEditor
          content={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg border border-stone-200 text-stone-600 text-sm hover:bg-stone-100 transition-colors"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors disabled:opacity-50"
        >
          {loading ? '投稿中…' : '投稿する'}
        </button>
      </div>
    </form>
  )
}
