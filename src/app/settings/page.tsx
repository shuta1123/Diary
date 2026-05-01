import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import BioForm from '@/components/BioForm'
import DeleteAccountButton from '@/components/DeleteAccountButton'

export const metadata = { title: 'アカウント設定' }

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { bio: true },
  })

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-serif font-bold text-stone-900">アカウント設定</h1>

      <section className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-stone-800 mb-1">自己紹介</h2>
        <p className="text-sm text-stone-500 mb-4">プロフィールページに表示されます。</p>
        <BioForm initialBio={user?.bio ?? ''} />
      </section>

      <section className="bg-white rounded-2xl border border-red-100 p-6">
        <h2 className="text-base font-semibold text-red-700 mb-1">アカウントを削除する</h2>
        <p className="text-sm text-stone-500 mb-5">
          アカウントを削除すると、すべての日記データが完全に消去されます。この操作は取り消せません。
        </p>
        <DeleteAccountButton />
      </section>
    </div>
  )
}
