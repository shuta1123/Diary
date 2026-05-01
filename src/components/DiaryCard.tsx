import Link from 'next/link'

type Props = {
  username: string
  genre: string
  date: string
  title: string
}

export default function DiaryCard({ username, genre, date, title }: Props) {
  return (
    <Link
      href={`/${username}/${encodeURIComponent(genre)}/${date}`}
      className="group block p-5 bg-white rounded-xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all"
    >
      <p className="text-xs text-stone-400 mb-1">{date}</p>
      <h3 className="font-serif font-semibold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
        {title}
      </h3>
    </Link>
  )
}
