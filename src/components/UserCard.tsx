import Link from 'next/link'

type Props = {
  username: string
  bio?: string | null
  diaryCount: number
}

export default function UserCard({ username, bio, diaryCount }: Props) {
  return (
    <Link
      href={`/${username}`}
      className="group block p-6 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
          {username[0].toUpperCase()}
        </div>
        <span className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
          {username}
        </span>
      </div>
      {bio && <p className="text-sm text-stone-500 mb-3 line-clamp-2">{bio}</p>}
      <p className="text-xs text-stone-400">{diaryCount} 件の日記</p>
    </Link>
  )
}
