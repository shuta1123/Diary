import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { Prisma } from '@prisma/client'
import { authOptions } from '@/lib/auth'
import { parseDiaryInput } from '@/lib/diary'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 })
  }

  const diary = await prisma.diary.findUnique({
    where: { id: params.id },
    select: { authorId: true, genre: true },
  })
  if (!diary) {
    return NextResponse.json({ error: '日記が見つかりません' }, { status: 404 })
  }
  if (diary.authorId !== session.user.id) {
    return NextResponse.json({ error: '権限がありません' }, { status: 403 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: '入力内容が正しくありません' }, { status: 400 })
  }

  const parsed = parseDiaryInput(payload)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  try {
    await prisma.diary.update({
      where: { id: params.id },
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        genre: parsed.data.genre,
        date: parsed.data.date,
      },
    })

    const username = session.user.username
    revalidatePath(`/${username}`)
    revalidatePath(`/${username}/${encodeURIComponent(diary.genre)}`)
    if (diary.genre !== parsed.data.genre) {
      revalidatePath(`/${username}/${encodeURIComponent(parsed.data.genre)}`)
    }
    return NextResponse.json({ genre: parsed.data.genre, datePath: parsed.data.datePath })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'その日付・ジャンルにはすでに日記があります' },
        { status: 400 }
      )
    }
    throw error
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 })
  }

  const diary = await prisma.diary.findUnique({
    where: { id: params.id },
    select: { authorId: true, genre: true },
  })
  if (!diary) {
    return NextResponse.json({ error: '日記が見つかりません' }, { status: 404 })
  }
  if (diary.authorId !== session.user.id) {
    return NextResponse.json({ error: '権限がありません' }, { status: 403 })
  }

  await prisma.diary.delete({ where: { id: params.id } })
  const username = session.user.username
  revalidatePath(`/${username}`)
  revalidatePath(`/${username}/${encodeURIComponent(diary.genre)}`)
  return NextResponse.json({ ok: true })
}
