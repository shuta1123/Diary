import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { Prisma } from '@prisma/client'
import { authOptions } from '@/lib/auth'
import { parseDiaryInput } from '@/lib/diary'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 })
  }

  if (!checkRateLimit(`diary:${session.user.id}`, 30, 60 * 60_000)) {
    return NextResponse.json({ error: 'しばらく待ってから再試行してください' }, { status: 429 })
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
    await prisma.diary.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        genre: parsed.data.genre,
        date: parsed.data.date,
        authorId: session.user.id,
      },
    })

    revalidatePath(`/${session.user.username}`)
    revalidatePath(`/${session.user.username}/${encodeURIComponent(parsed.data.genre)}`)
    return NextResponse.json(
      { genre: parsed.data.genre, datePath: parsed.data.datePath },
      { status: 201 }
    )
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
