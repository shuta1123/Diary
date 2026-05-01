import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const MAX_BIO_LENGTH = 200

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: '入力内容が正しくありません' }, { status: 400 })
  }

  const record = payload as Record<string, unknown>
  if (typeof record.bio !== 'string') {
    return NextResponse.json({ error: '入力内容が正しくありません' }, { status: 400 })
  }

  const bio = record.bio.trim()
  if (bio.length > MAX_BIO_LENGTH) {
    return NextResponse.json(
      { error: `自己紹介は${MAX_BIO_LENGTH}文字以内で入力してください` },
      { status: 400 }
    )
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio: bio || null },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 })
  }

  await prisma.user.delete({ where: { id: session.user.id } })
  return NextResponse.json({ ok: true })
}
