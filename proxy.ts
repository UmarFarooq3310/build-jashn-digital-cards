import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // Enforce Canonical Domain: 301 Permanent Redirect www.cardzy.online -> cardzy.online
  if (host.startsWith('www.')) {
    const canonicalHost = host.replace(/^www\./, '')
    const url = request.nextUrl.clone()
    url.host = canonicalHost
    url.protocol = 'https:'
    url.port = ''

    return NextResponse.redirect(url, {
      status: 301,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg, robots.txt, sitemap.xml
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)',
  ],
}
