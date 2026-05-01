import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import EditDiaryForm from '@/components/EditDiaryForm'

export default async function EditDiaryPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const [diary, genreRows] = await Promise.all([
    prisma.diary.findUnique({ where: { id: params.id } }),
    prisma.diary.findMany({
      where: { authorId: session.user.id },
      select: { genre: true },
      distinct: ['genre'],
      orderBy: { genre: 'asc' },
    }),
  ])

  if (!diary || diary.authorId !== session.user.id) notFound()

  const dateStr = diary.date.toISOString().split('T')[0]

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">日記を編集</h1>
      <EditDiaryForm
        id={diary.id}
        username={session.user.username}
        initialTitle={diary.title}
        initialGenre={diary.genre}
        initialDate={dateStr}
        initialContent={diary.content}
        genres={genreRows.map((r) => r.genre)}
      />
    </div>
  )
}
