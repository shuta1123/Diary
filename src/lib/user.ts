const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/
const MAX_EMAIL_LENGTH = 254
const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 128
const RESERVED_USERNAMES = new Set([
  'api', 'login', 'logout', 'register', 'diary', 'admin', 'settings',
  'profile', 'me', 'about', 'help', 'static', 'public', 'favicon',
])

export type RegisterInput = {
  username: string
  email: string
  password: string
}

export function normalizeEmail(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function normalizeUsername(value: unknown) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function parseRegisterInput(payload: unknown):
  | { ok: true; data: RegisterInput }
  | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: '入力内容が正しくありません' }
  }

  const record = payload as Record<string, unknown>
  const username = normalizeUsername(record.username)
  const email = normalizeEmail(record.email)
  const password = typeof record.password === 'string' ? record.password : ''

  if (!username || !email || !password) {
    return { ok: false, error: '全項目を入力してください' }
  }
  if (!USERNAME_PATTERN.test(username)) {
    return {
      ok: false,
      error: 'ユーザー名は3〜20文字の半角英数字と_で入力してください',
    }
  }
  if (RESERVED_USERNAMES.has(username)) {
    return { ok: false, error: 'そのユーザー名は使用できません' }
  }
  if (email.length > MAX_EMAIL_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'メールアドレスの形式が正しくありません' }
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, error: `パスワードは${MIN_PASSWORD_LENGTH}文字以上で入力してください` }
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return { ok: false, error: 'パスワードが長すぎます' }
  }

  return { ok: true, data: { username, email, password } }
}
