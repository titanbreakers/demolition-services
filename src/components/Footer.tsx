'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Locale } from '@/utilities/translations'

const Footer = () => {
  const [locale, setLocale] = useState<Locale>('nl')

  useEffect(() => {
    const storedLang = localStorage.getItem('locale') as Locale
    if (storedLang && (storedLang === 'nl' || storedLang === 'en')) {
      setLocale(storedLang)
    }
  }, [])

  const isEnglish = locale === 'en'

  const translations = {
    companyName: isEnglish ? 'titanbreakers' : 'titaanbrekers',
    tagline: isEnglish
      ? 'Professional demolition work with power and precision. Your partner in demolition and dismantling for over 25 years.'
      : 'Professioneel sloopwerk met kracht en precisie. Al meer dan 25 jaar uw partner in sloop en demontage.',
    navigation: isEnglish ? 'Navigation' : 'Navigatie',
    navLinks: isEnglish
      ? ['Home', 'Services', 'Projects', 'About Us', 'Contact']
      : ['Home', 'Diensten', 'Projecten', 'Over Ons', 'Contact'],
    services: isEnglish
      ? [
          'Building Demolition',
          'Industrial Dismantling',
          'Asbestos Removal',
          'Recycling',
          'Groundwork',
        ]
      : ['Gebouwen Sloop', 'Industriële Demontage', 'Asbest Sanering', 'Recycling', 'Grondwerk'],
    contact: isEnglish ? 'Contact' : 'Contact',
    address: isEnglish
      ? 'Industrialweg 45\n1234 AB Rotterdam'
      : 'Industrieweg 45\n1234 AB Rotterdam',
    phone: '06-12345678',
    email: isEnglish ? 'info@titanbreakers.nl' : 'info@titaanbrekers.nl',
    hours: isEnglish ? 'Mon-Fri: 07:00 - 18:00' : 'Ma-Vr: 07:00 - 18:00',
    copyright: isEnglish
      ? '© 2024 titanbreakers. All rights reserved.'
      : '© 2024 titaanbrekers. Alle rechten voorbehouden.',
    privacy: isEnglish ? 'Privacy Policy' : 'Privacy Policy',
    terms: isEnglish ? 'Terms & Conditions' : 'Algemene Voorwaarden',
  }

  const getNavUrl = (item: string): string => {
    if (item === 'Home') return '/'
    const itemLower = item.toLowerCase().replace(/ /g, '-')
    return `/${itemLower}`
  }

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
                {translations.companyName === 'titaanbrekers' ? (
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
            </div>
            <p className="text-muted-foreground mb-6">{translations.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">{translations.navigation}</h4>
            <ul className="space-y-3">
              {translations.navLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={getNavUrl(item)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">
              {isEnglish ? 'Services' : 'Diensten'}
            </h4>
            <ul className="space-y-3">
              {translations.services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-6 text-foreground">{translations.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground whitespace-pre-line">
                  {translations.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:+31${translations.phone.replace(/-/g, '')}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {translations.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${translations.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {translations.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{translations.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">{translations.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {translations.privacy}
              </Link>
              <Link
                href="/voorwaarden"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {translations.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
