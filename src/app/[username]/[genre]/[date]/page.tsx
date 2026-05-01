import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { decodePathSegment, parseDatePath } from '@/lib/diary'
import Breadcrumb from '@/components/Breadcrumb'
import DiaryActions from '@/components/DiaryActions'

export async function generateMetadata({ params }: { params: { username: string; genre: string; date: string } }) {
  const genre = decodePathSegment(params.genre)
  const from = parseDatePath(params.date)
  if (!genre || !from) return { title: '日記' }

  const user = await prisma.user.findUnique({ where: { username: params.username }, select: { id: true } })
  if (!user) return { title: '日記' }

  const diary = await prisma.diary.findUnique({
    where: { authorId_genre_date: { authorId: user.id, genre, date: from } },
    select: { title: true },
  })

  return { title: diary?.title ?? `${params.username} / ${genre}` }
}

export default async function DiaryPage({ params }: { params: { username: string; genre: string; date: string } }) {
  const genre = decodePathSegment(params.genre)
  const from = parseDatePath(params.date)
  if (!genre || !from) notFound()

  const user = await prisma.user.findUnique({ where: { username: params.username }, select: { id: true } })
  if (!user) notFound()

  const diary = await prisma.diary.findUnique({
    where: {
      authorId_genre_date: {
        authorId: user.id,
        genre,
        date: from,
      },
    },
  })

  if (!diary) notFound()

  const session = await getServerSession(authOptions)
  const isAuthor = session?.user.id === diary.authorId

  return (
    <div>
      <Breadcrumb
        crumbs={[
          { label: 'ホーム', href: '/' },
          { label: params.username, href: `/${params.username}` },
          { label: genre, href: `/${params.username}/${encodeURIComponent(genre)}` },
          { label: params.date },
        ]}
      />

      <div className="flex items-start justify-between mb-6">
        <p className="text-sm text-stone-400">{params.date}</p>
        {isAuthor && (
          <DiaryActions diaryId={diary.id} username={params.username} />
        )}
      </div>

      <article>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-6">{diary.title}</h1>
        <div
          className="prose prose-stone prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: diary.content }}
        />
      </article>
    </div>
  )
}
