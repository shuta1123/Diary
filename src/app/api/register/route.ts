import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { parseRegisterInput } from '@/lib/user'
import { checkRateLimit, getIp } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const ip = getIp(req)
  if (!checkRateLimit(`register:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: 'しばらく待ってから再試行してください' }, { status: 429 })
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: '入力内容が正しくありません' }, { status: 400 })
  }

  const parsed = parseRegisterInput(payload)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }
  const { username, email, password } = parsed.data

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
    select: { id: true },
  })
  if (exists) {
    return NextResponse.json({ error: 'そのメールアドレスまたはユーザー名は既に使われています' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 12)
  try {
    const user = await prisma.user.create({
      data: { username, email, password: hashed },
    })

    return NextResponse.json({ id: user.id, username: user.username }, { status: 201 })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'そのメールアドレスまたはユーザー名は既に使われています' },
        { status: 400 }
      )
    }

    throw error
  }
}
