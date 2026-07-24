import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Protected routes that require authentication.
 * Firebase Auth uses client-side tokens so we cannot verify JWTs in middleware
 * without the firebase-admin SDK. Instead we use a lightweight session cookie
 * (`jashn_authed`) that the FirebaseAuthListener sets on sign-in so the
 * middleware can redirect unauthenticated visitors before the page loads.
 *
 * The cookie is set/cleared by the client in firebase-auth-listener.tsx.
 * This provides a fast server-side redirect (no flash of protected content)
 * while the full auth state is still verified client-side.
 */
const PROTECTED_ROUTES = ['/dashboard']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  )

  if (!isProtected) return NextResponse.next()

  // Check for the lightweight auth presence cookie
  const isAuthed = request.cookies.has('jashn_authed')

  if (!isAuthed) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
