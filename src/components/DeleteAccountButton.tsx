'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'

export default function DeleteAccountButton() {
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const res = await fetch('/api/user', { method: 'DELETE' })
    if (res.ok) {
      await signOut({ callbackUrl: '/' })
    } else {
      setLoading(false)
    }
  }

  if (!confirmed) {
    return (
      <button
        onClick={() => setConfirmed(true)}
        className="px-5 py-2 rounded-lg border border-red-300 text-red-600 text-sm hover:bg-red-50 transition-colors"
      >
        アカウントを削除する
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-red-600">本当に削除しますか？すべての日記も削除されます。</p>
      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? '削除中…' : '完全に削除する'}
        </button>
        <button
          onClick={() => setConfirmed(false)}
          className="px-5 py-2 rounded-lg border border-stone-200 text-stone-600 text-sm hover:bg-stone-100 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}
