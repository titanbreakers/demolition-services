'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

const Footer = () => {
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

  const navLinks = [
    { name: t.nav?.home || 'Home', path: getLocalizedPath(paths.home, '/') },
    { name: t.nav?.services || 'Services', path: getLocalizedPath(paths.services, '/services') },
    { name: t.nav?.projects || 'Projects', path: getLocalizedPath(paths.projects, '/projects') },
    { name: t.nav?.about || 'About', path: getLocalizedPath(paths.about, '/about') },
    { name: t.nav?.contact || 'Contact', path: getLocalizedPath(paths.contact, '/contact') },
  ]

  const services = [
    t.services?.manual || 'Handmatige Sloop',
    t.services?.interior || 'Interieur Sloop',
    t.services?.asbestos || 'Asbest Sanering',
    t.services?.selective || 'Selectieve Sloop',
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
                <span>{t.company?.name || 'titaanbreakers'}</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6">{t.company?.tagline || ''}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">
              {t.footer?.navigation || 'Navigation'}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">
              {t.footer?.services || 'Services'}
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
              {t.footer?.contact || 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground whitespace-pre-line">
                  {t.footer?.address || 'Industrieweg 45\n1234 AB Rotterdam'}
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
                  href={`mailto:${t.footer?.email || 'info@titaanbrekers.nl'}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.footer?.email || 'info@titaanbrekers.nl'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  {t.footer?.hours?.weekday || 'Ma-Vr: 07:00 - 18:00'}
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
              {t.footer?.copyright || '© 2024. Alle rechten voorbehouden.'}
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href={getLocalizedPath(paths.about, '/about') + '/privacy'}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.footer?.privacy || 'Privacy'}
              </Link>
              <Link
                href={getLocalizedPath(paths.about, '/about') + '/voorwaarden'}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t.footer?.terms || 'Voorwaarden'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
