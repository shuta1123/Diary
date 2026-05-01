import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import NewDiaryForm from '@/components/NewDiaryForm'

export default async function NewDiaryPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const genreRows = await prisma.diary.findMany({
    where: { authorId: session.user.id },
    select: { genre: true },
    distinct: ['genre'],
    orderBy: { genre: 'asc' },
  })

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">日記を書く</h1>
      <NewDiaryForm
        username={session.user.username}
        genres={genreRows.map((r) => r.genre)}
      />
    </div>
  )
}
