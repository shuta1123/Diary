'use client'

import { useState, useRef, useEffect } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  genres: string[]
}

export default function GenreInput({ value, onChange, genres }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = genres.filter((g) =>
    g.toLowerCase().includes(value.toLowerCase())
  )

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        required
        value={value}
        placeholder="日常・旅行・読書…"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden">
          {filtered.map((g) => (
            <li
              key={g}
              onMouseDown={() => {
                onChange(g)
                setOpen(false)
              }}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors hover:bg-amber-50 hover:text-amber-700 ${
                value === g ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-700'
              }`}
            >
              {g}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
