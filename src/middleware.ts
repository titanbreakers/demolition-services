import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported locales
const locales = [
  'nl',
  'en',
  'fr',
  'de',
  'it',
  'es',
  'sv',
  'fi',
  'pl',
  'ar',
  'zh',
  'ja',
  'pt',
  'tr',
  'ru',
]
const defaultLocale = 'nl'

// URL mapping for translated slugs (public URL -> internal path)
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
  fr: {
    services: 'diensten',
    projets: 'projecten',
    actualites: 'nieuws',
    'a-propos': 'over-ons',
    contact: 'contact',
  },
  de: {
    leistungen: 'diensten',
    projekte: 'projecten',
    neuigkeiten: 'nieuws',
    'ueber-uns': 'over-ons',
    kontakt: 'contact',
  },
  it: {
    servizi: 'diensten',
    progetti: 'projecten',
    notizie: 'nieuws',
    'chi-siamo': 'over-ons',
    contatti: 'contact',
  },
  es: {
    servicios: 'diensten',
    proyectos: 'projecten',
    noticias: 'nieuws',
    nosotros: 'over-ons',
    contacto: 'contact',
  },
  sv: {
    tjanster: 'diensten',
    projekt: 'projecten',
    nyheter: 'nieuws',
    'om-oss': 'over-ons',
    kontakt: 'contact',
  },
  fi: {
    palvelut: 'diensten',
    projektit: 'projecten',
    uutiset: 'nieuws',
    meista: 'over-ons',
    yhteys: 'contact',
  },
  pl: {
    uslugi: 'diensten',
    projekty: 'projecten',
    aktualnosci: 'nieuws',
    'o-nas': 'over-ons',
    kontakt: 'contact',
  },
  ar: {
    alkhdm: 'diensten',
    mahdt: 'projecten',
    akhbar: 'nieuws',
    ana: 'over-ons',
    tatsel: 'contact',
  },
  zh: {
    fuwu: 'diensten',
    xiangmu: 'projecten',
    xinwen: 'nieuws',
    guanyu: 'over-ons',
    lianxi: 'contact',
  },
  ja: {
    saabisu: 'diensten',
    purojekuto: 'projecten',
    nyuusu: 'nieuws',
    kaishame: 'over-ons',
    renrakus: 'contact',
  },
  pt: {
    servicos: 'diensten',
    projetos: 'projecten',
    noticias: 'nieuws',
    sobre: 'over-ons',
    contacto: 'contact',
  },
  tr: {
    hizmetler: 'diensten',
    projeler: 'projecten',
    haberler: 'nieuws',
    hakkimizda: 'over-ons',
    iletisim: 'contact',
  },
  ru: {
    uslugi: 'diensten',
    proekty: 'projecten',
    novosti: 'nieuws',
    'o-nas': 'over-ons',
    kontakt: 'contact',
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

  // Check if pathname starts with a supported locale
  const pathParts = pathname.split('/').filter(Boolean)
  const pathnameLocale = pathParts[0]

  // If no locale in path, redirect to default
  if (!pathnameLocale || !locales.includes(pathnameLocale)) {
    const localeCookie = request.cookies.get('locale')
    const locale = localeCookie?.value || defaultLocale

    const newPathname = `/${locale}${pathname}`
    const newUrl = new URL(newPathname, request.url)

    const response = NextResponse.redirect(newUrl)
    response.cookies.set('locale', locale, { path: '/' })
    return response
  }

  // We have a valid locale
  const locale = pathnameLocale as (typeof locales)[number]
  const slug = pathParts[1] || ''

  // If no slug (just /locale), set cookie and continue
  if (!slug) {
    const response = NextResponse.next()
    response.cookies.set('locale', locale, { path: '/' })
    return response
  }

  // Check if the slug needs to be rewritten (public URL -> internal path)
  const internalSlug = urlMappings[locale]?.[slug]

  if (internalSlug && internalSlug !== slug) {
    const newPathname = `/${locale}/${internalSlug}${pathname.slice(`/${locale}/${slug}`.length)}`
    const rewriteUrl = new URL(newPathname, request.url)

    const response = NextResponse.rewrite(rewriteUrl)
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
