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
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete() {
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
      setConfirming(false)
    } catch {
      setError('通信に失敗しました')
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {!confirming ? (
        <div className="flex gap-2">
          <Link
            href={`/diary/edit/${diaryId}`}
            className="px-4 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-sm hover:bg-stone-100 transition-colors"
          >
            編集
          </Link>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="px-4 py-1.5 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors"
          >
            削除
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-end gap-2">
          <p className="text-sm text-red-600 font-medium">本当に削除しますか？</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deleting ? '削除中…' : '削除する'}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="px-4 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-sm hover:bg-stone-100 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
