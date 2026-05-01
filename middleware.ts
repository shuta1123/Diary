export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/diary/new', '/diary/edit/:id', '/settings'],
}
