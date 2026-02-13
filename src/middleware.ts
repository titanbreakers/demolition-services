import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported locales
const locales = ['nl', 'en']
const defaultLocale = 'nl'

// URL mapping for translated slugs
const urlMappings: Record<string, Record<string, string>> = {
  nl: {
    diensten: 'diensten',
    projecten: 'projecten',
    nieuws: 'nieuws',
    'over-ons': 'over-ons',
    contact: 'contact',
  },
  en: {
    services: 'diensten',
    projects: 'projecten',
    blog: 'nieuws',
    about: 'over-ons',
    contact: 'contact',
  },
}

// Reverse mapping for redirecting from internal paths to public URLs
const reverseMappings: Record<string, Record<string, string>> = {
  nl: {
    diensten: 'diensten',
    projecten: 'projecten',
    nieuws: 'nieuws',
    'over-ons': 'over-ons',
    contact: 'contact',
  },
  en: {
    diensten: 'services',
    projecten: 'projects',
    nieuws: 'blog',
    'over-ons': 'about',
    contact: 'contact',
  },
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and admin
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/payload') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (!pathnameHasLocale) {
    // Check for locale in cookie
    const localeCookie = request.cookies.get('locale')
    const locale = localeCookie?.value || defaultLocale

    // Redirect to locale-prefixed path
    const newPathname = `/${locale}${pathname}`
    const newUrl = new URL(newPathname, request.url)

    const response = NextResponse.redirect(newUrl)
    response.cookies.set('locale', locale, { path: '/' })
    return response
  }

  // Extract locale and path
  const pathParts = pathname.split('/').filter(Boolean)
  const locale = pathParts[0] as 'nl' | 'en'
  const slug = pathParts[1] || ''

  // If no slug (home page), just set cookie and continue
  if (!slug) {
    const response = NextResponse.next()
    response.cookies.set('locale', locale, { path: '/' })
    return response
  }

  // Check if the slug needs to be rewritten
  const internalSlug = urlMappings[locale]?.[slug]

  if (internalSlug && internalSlug !== slug) {
    // Rewrite to internal path
    const newPathname = `/${locale}/${internalSlug}${pathname.slice(`/${locale}/${slug}`.length)}`
    const rewriteUrl = new URL(newPathname, request.url)

    const response = NextResponse.rewrite(rewriteUrl)
    response.cookies.set('locale', locale, { path: '/' })
    return response
  }

  // Check if this is already an internal path that should be redirected to public URL
  const publicSlug = reverseMappings[locale]?.[slug]
  if (publicSlug && publicSlug !== slug && request.headers.get('x-middleware-rewrite') !== 'true') {
    // Redirect from internal path to public URL
    const newPathname = `/${locale}/${publicSlug}${pathname.slice(`/${locale}/${slug}`.length)}`
    const redirectUrl = new URL(newPathname, request.url)

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set('locale', locale, { path: '/' })
    return response
  }

  // Set locale cookie and continue
  const response = NextResponse.next()
  response.cookies.set('locale', locale, { path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|admin|payload|favicon.ico|.*\\.).*)'],
}
