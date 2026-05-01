import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { normalizeEmail } from './user'
import { checkRateLimit } from './rate-limit'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const ip =
          (req?.headers?.['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ??
          (req?.headers?.['x-real-ip'] as string | undefined) ??
          'unknown'
        if (!checkRateLimit(`login:${ip}`, 10, 60_000)) return null

        const email = normalizeEmail(credentials.email)

        const user = await prisma.user.findUnique({
          where: { email },
        })
        if (!user) return null

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null

        return { id: user.id, name: user.username }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.name ?? ''
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.username = token.username as string
      return session
    },
  },
  pages: { signIn: '/login' },
}
