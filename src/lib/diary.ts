import sanitizeHtml from 'sanitize-html'

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['blockquote', 'br', 'code', 'em', 'h2', 'h3', 'hr', 'li', 'ol', 'p', 'pre', 's', 'strong', 'ul'],
  allowedAttributes: {},
  disallowedTagsMode: 'discard',
}

const MAX_TITLE_LENGTH = 120
const MAX_GENRE_LENGTH = 40
const MAX_CONTENT_LENGTH = 20000

export type DiaryInput = {
  title: string
  content: string
  genre: string
  date: Date
  datePath: string
}

export function getLocalDatePath(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function parseDatePath(value: unknown) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return date
}

export function getNextUtcDate(date: Date) {
  const next = new Date(date)
  next.setUTCDate(next.getUTCDate() + 1)
  return next
}

export function decodePathSegment(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return null
  }
}

export function sanitizeDiaryHtml(value: unknown) {
  if (typeof value !== 'string') return ''
  return sanitizeHtml(value, SANITIZE_OPTIONS)
}

export function getPlainTextFromHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function parseDiaryInput(payload: unknown):
  | { ok: true; data: DiaryInput }
  | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: '入力内容が正しくありません' }
  }

  const record = payload as Record<string, unknown>
  const title = typeof record.title === 'string' ? record.title.trim() : ''
  const genre = typeof record.genre === 'string' ? record.genre.trim() : ''
  const content = sanitizeDiaryHtml(record.content)
  const date = parseDatePath(record.date)

  if (!title || !genre || !content || !date) {
    return { ok: false, error: '全項目を入力してください' }
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: `タイトルは${MAX_TITLE_LENGTH}文字以内で入力してください` }
  }
  if (genre.length > MAX_GENRE_LENGTH) {
    return { ok: false, error: `ジャンルは${MAX_GENRE_LENGTH}文字以内で入力してください` }
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    return { ok: false, error: '本文が長すぎます' }
  }
  if (!getPlainTextFromHtml(content)) {
    return { ok: false, error: '本文を入力してください' }
  }

  return {
    ok: true,
    data: {
      title,
      content,
      genre,
      date,
      datePath: record.date as string,
    },
  }
}
