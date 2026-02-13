'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { translations, type Locale } from '@/utilities/translations'

interface HeaderClientProps {
  siteSettings?: any
}

// Path mappings for translated URLs
const pathMappings: Partial<Record<Locale, Record<string, string>>> = {
  nl: {
    home: '/',
    services: '/diensten',
    projects: '/projecten',
    blog: '/nieuws',
    about: '/over-ons',
    contact: '/contact',
  },
  en: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
}

export default function HeaderClient({ siteSettings }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [locale, setLocale] = useState<Locale>('nl')
  const pathname = usePathname()

  useEffect(() => {
    // Get locale from URL path
    const pathParts = pathname.split('/').filter(Boolean)
    const urlLocale = pathParts[0] as Locale

    if (urlLocale && (urlLocale === 'nl' || urlLocale === 'en')) {
      setLocale(urlLocale)
      localStorage.setItem('locale', urlLocale)
    } else {
      // Fallback to localStorage or default
      const storedLang = localStorage.getItem('locale') as Locale
      if (storedLang && (storedLang === 'nl' || storedLang === 'en')) {
        setLocale(storedLang)
      }
    }
  }, [pathname])

  const t = translations[locale]
  const paths = pathMappings[locale] || pathMappings['nl']!

  const navLinks = [
    { name: t.nav.home, path: paths.home },
    { name: t.nav.services, path: paths.services },
    { name: t.nav.projects, path: paths.projects },
    {
      name: (t.nav as any).blog || (locale === 'nl' ? 'Nieuws' : 'Blog'),
      path: paths.blog || (locale === 'nl' ? '/nieuws' : '/blog'),
    },
    { name: t.nav.about, path: paths.about },
    { name: t.nav.contact, path: paths.contact },
  ]

  const companyName = siteSettings?.companyName || 'TitanBrekers'
  const logoLetter = siteSettings?.logo?.letter || 'T'
  const phone = siteSettings?.contact?.phone || '06-12345678'

  // Check if current path matches (accounting for locale prefix)
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
              {companyName.split('Brekers')[0]}
              <span className="text-primary">BREKERS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
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
            <Link href={paths.contact} className="btn-power text-sm py-3 px-6 whitespace-nowrap">
              {t.cta.quote}
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
                key={link.path}
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
              <span className="text-sm text-muted-foreground">{t.mobile.language}</span>
              <LanguageSwitcher />
            </div>
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-primary font-semibold">
              <Phone className="w-5 h-5" />
              <span>{phone}</span>
            </a>
            <Link
              href={paths.contact}
              className="btn-power text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.cta.quote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
