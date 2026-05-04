import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Breadcrumb from '@/components/Breadcrumb'

export async function generateMetadata({ params }: { params: { username: string } }) {
  return { title: `${params.username} の日記` }
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    select: { id: true, username: true, bio: true },
  })

  if (!user) notFound()

  const genreRows = await prisma.diary.findMany({
    where: { authorId: user.id },
    select: { genre: true },
    distinct: ['genre'],
    orderBy: { genre: 'asc' },
  })
  const genres = genreRows.map((r) => r.genre)

  return (
    <div>
      <Breadcrumb crumbs={[{ label: 'ホーム', href: '/' }, { label: params.username }]} />

      <div className="mb-10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-3xl">
          {user.username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">{user.username}</h1>
          {user.bio && <p className="text-stone-500 mt-1">{user.bio}</p>}
        </div>
      </div>

      <h2 className="text-lg font-semibold text-stone-700 mb-4">ジャンル</h2>

      {genres.length === 0 ? (
        <p className="text-stone-400">まだ日記がありません</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/${params.username}/${encodeURIComponent(genre)}`}
              className="px-5 py-2 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all text-sm font-medium"
            >
              {genre}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
