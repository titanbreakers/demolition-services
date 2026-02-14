'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

interface HeaderClientProps {
  siteSettings?: any
}

export default function HeaderClient({ siteSettings }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t, locale, setLocale } = useTranslation()

  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean)
    const urlLocale = pathParts[0]
    const supportedLocales = [
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
    if (urlLocale && supportedLocales.includes(urlLocale)) {
      localStorage.setItem('locale', urlLocale)
      // Sync URL locale with translation context
      if (urlLocale !== locale) {
        setLocale(urlLocale)
      }
    }
  }, [pathname, locale, setLocale])

  const paths = t.paths || {}

  const companyName = t.company?.name || 'titaanbrekers'

  const getPathForLocale = (pathKey: keyof typeof paths): string => {
    const path = paths[pathKey]
    if (!path) return '/'
    if (path === '/') return `/${locale}`
    return `/${locale}${path}`
  }

  const navLinks = [
    { name: t.nav?.home || 'Home', path: getPathForLocale('home') },
    { name: t.nav?.services || 'Services', path: getPathForLocale('services') },
    { name: t.nav?.projects || 'Projects', path: getPathForLocale('projects') },
    { name: t.nav?.blog || 'Blog', path: getPathForLocale('blog') },
    { name: t.nav?.about || 'About', path: getPathForLocale('about') },
    { name: t.nav?.contact || 'Contact', path: getPathForLocale('contact') },
  ]

  const logoLetter = 'T'
  const phone = '06-12345678'

  const isActive = (path: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/'
    const linkPath = path.replace(`/${locale}`, '') || '/'
    return currentPath === linkPath
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="font-display text-2xl text-primary-foreground font-bold">
                {logoLetter}
              </span>
            </div>
            <span className="font-display text-2xl tracking-wider text-foreground">
              {companyName === 'titaanbrekers' ? (
                <>
                  <span>titaan</span>
                  <span className="text-primary">brekers</span>
                </>
              ) : (
                <>
                  <span>titan</span>
                  <span className="text-primary">breakers</span>
                </>
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium uppercase tracking-wider text-sm transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href={`tel:${phone}`}
              className="hidden xl:flex items-center gap-2 text-primary font-semibold"
            >
              <Phone className="w-5 h-5" />
              <span className="whitespace-nowrap">{phone}</span>
            </a>
            <Link
              href={getPathForLocale('contact')}
              className="btn-power text-sm py-3 px-6 whitespace-nowrap"
            >
              {t.cta?.freeQuote || 'Gratis Offerte'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium uppercase tracking-wider text-lg transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">{t.mobile?.language || 'Taal'}</span>
              <LanguageSwitcher />
            </div>
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-primary font-semibold">
              <Phone className="w-5 h-5" />
              <span>{phone}</span>
            </a>
            <Link
              href={getPathForLocale('contact')}
              className="btn-power text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.cta?.freeQuote || 'Gratis Offerte'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
