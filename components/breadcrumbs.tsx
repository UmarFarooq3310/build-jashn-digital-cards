import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  homeLabel?: string
  isDark?: boolean
}

export function Breadcrumbs({
  items,
  className,
  homeLabel = 'Home',
  isDark = false,
}: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { label: homeLabel, href: '/' },
    ...items,
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? (item.href.startsWith('http') ? item.href : `https://cardzy.online${item.href}`) : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn(
          'flex items-center text-xs font-medium overflow-x-auto py-2.5 scrollbar-none select-none',
          isDark ? 'text-zinc-400' : 'text-muted-foreground',
          className
        )}
      >
        <ol className="flex items-center gap-1.5 flex-nowrap whitespace-nowrap">
          {fullItems.map((item, idx) => {
            const isLast = idx === fullItems.length - 1
            return (
              <li key={idx} className="flex items-center gap-1.5">
                {idx === 0 ? (
                  <Link
                    href="/"
                    className={cn(
                      'inline-flex items-center gap-1 transition-colors hover:underline',
                      isDark ? 'text-[#D4AF37] hover:text-white' : 'text-emerald-700 hover:text-foreground'
                    )}
                  >
                    <Home className="size-3.5" />
                    <span>{item.label}</span>
                  </Link>
                ) : item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'transition-colors hover:underline max-w-[200px] truncate',
                      isDark ? 'text-zinc-300 hover:text-[#D4AF37]' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(
                      'font-bold max-w-[240px] sm:max-w-[360px] truncate',
                      isDark ? 'text-white' : 'text-foreground'
                    )}
                  >
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <ChevronRight
                    className={cn(
                      'size-3.5 shrink-0 opacity-60',
                      isDark ? 'text-zinc-500' : 'text-muted-foreground/60'
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
