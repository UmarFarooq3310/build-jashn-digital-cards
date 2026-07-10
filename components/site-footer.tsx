import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <img src="/icon.svg" alt="Jashn" className="size-8 rounded-lg" />
              <span className="text-lg font-extrabold text-primary">Jashn</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pakistan&apos;s first animated digital wish and invitation card
              platform. Beautiful, bilingual, and free to start.
            </p>
            <p className="mt-3 font-urdu text-lg text-primary">جشن — ہر خوشی کا پیغام</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol
              title="Wishes"
              links={[
                { href: '/create-wish', label: 'Send a Wish' },
                { href: '/create-invitation', label: 'Create Invitation' },
              ]}
            />
            <FooterCol
              title="Account"
              links={[
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/login', label: 'Log in' },
              ]}
            />
            <FooterCol
              title="Platform"
              links={[
                { href: '/', label: 'Home' },
                { href: '/pricing', label: 'Plans' },
                { href: '/faq', label: 'FAQs' },
                { href: '/guide', label: 'Guides' },
                { href: '/privacy', label: 'Privacy Policy' },
              ]}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Jashn.app — Made with love in Pakistan.{' '}
          <Link href="/privacy" className="hover:text-primary underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
