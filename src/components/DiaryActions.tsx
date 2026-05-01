'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  diaryId: string
  username: string
}

export default function DiaryActions({ diaryId, username }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete() {
    if (!confirm('この日記を削除しますか？')) return
    setError('')
    setDeleting(true)

    try {
      const res = await fetch(`/api/diary/${diaryId}`, { method: 'DELETE' })
      const data = await res.json()

      if (res.ok) {
        router.push(`/${username}`)
        router.refresh()
        return
      }

      setError(data.error ?? '削除に失敗しました')
      setDeleting(false)
    } catch {
      setError('通信に失敗しました')
      setDeleting(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <Link
          href={`/diary/edit/${diaryId}`}
          className="px-4 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-sm hover:bg-stone-100 transition-colors"
        >
          編集
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-1.5 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {deleting ? '削除中…' : '削除'}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
