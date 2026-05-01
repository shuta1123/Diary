import { prisma } from '@/lib/prisma'
import UserCard from '@/components/UserCard'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      bio: true,
      _count: { select: { diaries: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">みんなの日記</h1>
        <p className="text-stone-500">日々の記録を、自分だけの言葉で。</p>
      </div>

      {users.length === 0 ? (
        <p className="text-stone-400 text-center py-20">まだユーザーがいません</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              username={user.username}
              bio={user.bio}
              diaryCount={user._count.diaries}
            />
          ))}
        </div>
      )}
    </div>
  )
}
