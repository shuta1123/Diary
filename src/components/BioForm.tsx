'use client'

import { useState } from 'react'

const MAX_BIO_LENGTH = 200

export default function BioForm({ initialBio }: { initialBio: string }) {
  const [bio, setBio] = useState(initialBio)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')

    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio }),
    })

    if (res.ok) {
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } else {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        value={bio}
        onChange={(e) => { setBio(e.target.value); setStatus('idle') }}
        maxLength={MAX_BIO_LENGTH}
        rows={3}
        className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        placeholder="自己紹介を入力..."
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-400">{bio.length} / {MAX_BIO_LENGTH}</span>
        <button
          type="submit"
          disabled={status === 'saving'}
          className="px-4 py-1.5 rounded-lg bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors disabled:opacity-50"
        >
          {status === 'saving' ? '保存中…' : status === 'saved' ? '保存しました ✓' : '保存する'}
        </button>
      </div>
      {status === 'error' && <p className="text-red-500 text-sm">保存に失敗しました</p>}
    </form>
  )
}
