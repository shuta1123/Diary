import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { decodePathSegment } from '@/lib/diary'
import Breadcrumb from '@/components/Breadcrumb'
import DiaryCard from '@/components/DiaryCard'

export async function generateMetadata({ params }: { params: { username: string; genre: string } }) {
  const genre = decodePathSegment(params.genre) ?? '日記'
  return { title: `${params.username} / ${genre}` }
}

export default async function GenrePage({ params }: { params: { username: string; genre: string } }) {
  const genre = decodePathSegment(params.genre)
  if (!genre) notFound()

  const user = await prisma.user.findUnique({ where: { username: params.username }, select: { id: true } })
  if (!user) notFound()

  const diaries = await prisma.diary.findMany({
    where: { authorId: user.id, genre },
    orderBy: { date: 'desc' },
  })

  if (diaries.length === 0) notFound()

  return (
    <div>
      <Breadcrumb
        crumbs={[
          { label: 'ホーム', href: '/' },
          { label: params.username, href: `/${params.username}` },
          { label: genre },
        ]}
      />

      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">
        {genre}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {diaries.map((diary) => {
          const dateStr = diary.date.toISOString().split('T')[0]
          return (
            <DiaryCard
              key={diary.id}
              username={params.username}
              genre={genre}
              date={dateStr}
              title={diary.title}
            />
          )
        })}
      </div>
    </div>
  )
}
