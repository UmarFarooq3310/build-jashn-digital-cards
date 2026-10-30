import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const proto = request.headers.get('x-forwarded-proto')

  // Never redirect local development or loopback addresses
  if (
    !host ||
    host.includes('localhost') ||
    host.includes('127.0.0.1') ||
    host.startsWith('192.168.') ||
    host.startsWith('10.') ||
    host.endsWith('.local')
  ) {
    return NextResponse.next()
  }

  // Enforce Canonical Domain & Protocol in a SINGLE hop (prevents 308 redirect chains):
  // http://www.cardzy.online -> https://cardzy.online (1 hop)
  // https://www.cardzy.online -> https://cardzy.online (1 hop)
  // http://cardzy.online -> https://cardzy.online (1 hop)
  if (host.startsWith('www.') || proto === 'http') {
    const canonicalHost = host.replace(/^www\./, '') || 'cardzy.online'
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
