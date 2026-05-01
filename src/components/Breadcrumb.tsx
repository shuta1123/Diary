import Link from 'next/link'

type Crumb = { label: string; href?: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-8">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-amber-700 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-stone-600">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
