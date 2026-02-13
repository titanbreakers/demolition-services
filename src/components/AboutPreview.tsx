'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/utilities/translations'

interface AboutPreviewProps {
  data?: any
}

const AboutPreview = ({ data }: AboutPreviewProps) => {
  const [locale, setLocale] = useState<Locale>('nl')
  const pathname = usePathname()

  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean)
    const urlLocale = pathParts[0] as Locale

    if (
      urlLocale &&
      [
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
      ].includes(urlLocale)
    ) {
      setLocale(urlLocale)
    } else {
      const storedLang = localStorage.getItem('locale') as Locale
      if (storedLang) {
        setLocale(storedLang)
      }
    }
  }, [pathname])

  const isEnglish = locale === 'en'

  const title = data?.title || (isEnglish ? 'ABOUT TITANBREAKERS' : 'OVER TITAANBREKERS')
  const description =
    data?.description ||
    (isEnglish
      ? 'With more than 25 years of experience, titanbreakers has grown into one of the most respected demolition companies in the Netherlands. We combine craftsmanship with modern techniques for every type of demolition and dismantling project.'
      : 'Met meer dan 25 jaar ervaring is titaanbrekers uitgegroeid tot een van de meest gerespecteerde sloopbedrijven van Nederland. Wij combineren vakmanschap met moderne technieken voor elk type sloop- en demontageproject.')

  const highlights = data?.highlights || [
    {
      text: isEnglish
        ? 'VCA** certified and fully insured'
        : 'VCA** gecertificeerd en volledig verzekerd',
    },
    {
      text: isEnglish
        ? 'Modern equipment and experienced professionals'
        : 'Modern machinepark en ervaren vakmensen',
    },
    {
      text: isEnglish
        ? '98% recycling of all demolition waste'
        : '98% recycling van alle sloopafval',
    },
    {
      text: isEnglish
        ? 'National coverage with local service'
        : 'Landelijke dekking met lokale service',
    },
  ]

  const stats = [
    { number: '25+', label: isEnglish ? 'Years Active' : 'Jaar Actief' },
    { number: '500+', label: isEnglish ? 'Projects' : 'Projecten' },
    { number: '50+', label: isEnglish ? 'Employees' : 'Medewerkers' },
    { number: '98%', label: isEnglish ? 'Recycling' : 'Recycling' },
  ]

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {isEnglish ? 'About TitanBrekers' : 'Over TitanBrekers'}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-gradient">{title.split(' ').slice(-1)}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">{description}</p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map((highlight: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{highlight.text}</span>
                </div>
              ))}
            </div>

            <Link href="/over-ons" className="btn-power inline-flex items-center gap-2">
              {isEnglish ? 'More About Us' : 'Meer Over Ons'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right - Stats Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`card-industrial p-8 text-center ${index % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <div className="font-display text-6xl text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Warning Stripe */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 warning-stripe opacity-50" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
