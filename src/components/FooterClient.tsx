'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface FooterClientProps {
  footerData?: any
}

const FooterClient = ({ footerData }: FooterClientProps) => {
  const { t, locale } = useTranslation()

  const paths = t.paths || {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  }

  const getLocalizedPath = (path: string | undefined, fallback: string) => {
    const safePath = path || fallback
    if (safePath === '/') return `/${locale}`
    return `/${locale}${safePath}`
  }

  // Translated navigation links
  const navLinks =
    footerData?.navItems?.length > 0
      ? footerData.navItems.map((item: any) => ({
          name: item.link?.label || item.label,
          path: item.link?.url || item.url || '/',
        }))
      : [
          { name: t.nav?.home || 'Home', path: getLocalizedPath(paths.home, '/') },
          {
            name: t.nav?.services || 'Services',
            path: getLocalizedPath(paths.services, '/services'),
          },
          {
            name: t.nav?.projects || 'Projects',
            path: getLocalizedPath(paths.projects, '/projects'),
          },
          { name: t.nav?.blog || 'Blog', path: getLocalizedPath(paths.blog, '/blog') },
          { name: t.nav?.about || 'About', path: getLocalizedPath(paths.about, '/about') },
          { name: t.nav?.contact || 'Contact', path: getLocalizedPath(paths.contact, '/contact') },
        ]

  const services =
    locale === 'en'
      ? [
          t.services?.manual || 'Manual Demolition',
          t.services?.interior || 'Interior Demolition',
          t.services?.selective || 'Selective Demolition',
          t.services?.kitchen || 'Kitchen & Bathroom',
          t.services?.clearing || 'Property Clearing',
          t.services?.asbestos || 'Asbestos Removal',
        ]
      : [
          t.services?.manual || 'Handmatige Sloop',
          t.services?.interior || 'Interieur Sloop',
          t.services?.selective || 'Selectieve Sloop',
          t.services?.kitchen || 'Keuken & Badkamer',
          t.services?.clearing || 'Woning Ontruiming',
          t.services?.asbestos || 'Asbest Sanering',
        ]

  return (
    <footer className="bg-card border-t border-border">
      {/* Warning Stripe */}
      <div className="h-2 warning-stripe" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="font-display text-2xl text-primary-foreground font-bold">T</span>
              </div>
              <span className="font-display text-2xl tracking-wider text-foreground">
                TITAN<span className="text-primary">BREAKERS</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {locale === 'en'
                ? t.footer?.tagline ||
                  'Manual demolition work with hammer and chisel. For more than 25 years your partner in indoor demolition and renovation.'
                : t.footer?.tagline ||
                  'Handmatig sloopwerk met hamer en beitel. Al meer dan 25 jaar uw partner in binnensloop en renovatie.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">
              {t.footer?.navigation || (locale === 'en' ? 'Navigation' : 'Navigatie')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link: any) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">
              {t.nav?.services || (locale === 'en' ? 'Services' : 'Diensten')}
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">
              {t.nav?.contact || (locale === 'en' ? 'Contact' : 'Contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  {t.footer?.address?.street || 'Industrieweg 45'}
                  <br />
                  {t.footer?.address?.city || '1234 AB Rotterdam'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+31612345678"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.footer?.phone || '06-12345678'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:info@${locale === 'en' ? 'titanbreakers.nl' : 'titaanbrekers.nl'}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.footer?.email ||
                    `info@${locale === 'en' ? 'titanbreakers.nl' : 'titaanbrekers.nl'}`}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  {locale === 'en'
                    ? t.footer?.hours?.weekday || 'Mon-Fri: 07:00 - 18:00'
                    : t.footer?.hours?.weekday || 'Ma-Vr: 07:00 - 18:00'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {locale === 'en'
                ? t.footer?.copyright || '© 2024 TitanBreakers. All rights reserved.'
                : t.footer?.copyright || '© 2024 TitanBreakers. Alle rechten voorbehouden.'}
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.footer?.privacy || 'Privacy Policy'}
              </Link>
              <Link
                href="/voorwaarden"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {locale === 'en'
                  ? t.footer?.terms || 'Terms & Conditions'
                  : t.footer?.voorwaarden || 'Algemene Voorwaarden'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterClient
