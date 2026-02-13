'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { CheckCircle, Users, Target, Heart, Shield } from 'lucide-react'
import type { Locale } from '@/utilities/translations'

interface OverOnsClientProps {
  pageData?: any
}

const getIconComponent = (iconName: string) => {
  const icons: any = {
    Shield,
    Target,
    Heart,
    Users,
  }
  return icons[iconName] || Shield
}

export default function OverOnsClient({ pageData }: OverOnsClientProps) {
  const [locale, setLocale] = useState<Locale>('nl')

  useEffect(() => {
    const storedLang = localStorage.getItem('locale') as Locale
    if (storedLang && (storedLang === 'nl' || storedLang === 'en')) {
      setLocale(storedLang)
    }
  }, [])

  const isEnglish = locale === 'en'

  // Use CMS data or fallback with translations
  const hero = pageData?.hero || {
    title: isEnglish ? 'WHO WE ARE' : 'WIE ZIJN WIJ',
    description: isEnglish
      ? 'For more than 25 years, TitanBrekers has been the specialist in professional demolition work. With passion, craftsmanship, and modern equipment, we make room for the future.'
      : 'Al meer dan 25 jaar is TitanBrekers dé specialist in professioneel sloopwerk. Met passie, vakmanschap en moderne apparatuur maken wij ruimte voor de toekomst.',
  }

  const story = pageData?.story || {
    title: isEnglish ? 'OUR STORY' : 'ONS VERHAAL',
    paragraphs: isEnglish
      ? [
          {
            text: 'TitanBrekers was founded in 1999 by two experienced demolition workers with a clear mission: to deliver professional demolition work with attention to safety, quality, and the environment.',
          },
          {
            text: 'What started as a small family business has grown into one of the most respected demolition companies in the Netherlands. With more than 50 employees, a modern fleet of equipment, and all necessary certifications, we tackle every project - big or small.',
          },
          {
            text: 'Our strength lies in our team. Experienced professionals who are proud of their work and always strive for the best result. Together with our clients, we find solutions for the most complex demolition projects.',
          },
        ]
      : [
          {
            text: 'TitanBrekers werd in 1999 opgericht door twee ervaren slopers met een duidelijke missie: professioneel sloopwerk leveren met oog voor veiligheid, kwaliteit en milieu.',
          },
          {
            text: 'Wat begon als een klein familiebedrijf is uitgegroeid tot een van de meest gerespecteerde sloopbedrijven van Nederland. Met meer dan 50 medewerkers, een modern machinepark en alle benodigde certificeringen pakken wij elk project aan - groot of klein.',
          },
          {
            text: 'Onze kracht zit in ons team. Ervaren vakmensen die trots zijn op hun werk en altijd streven naar het beste resultaat. Samen met onze opdrachtgevers vinden wij oplossingen voor de meest complexe sloopprojecten.',
          },
        ],
  }

  const stats = pageData?.stats || [
    { number: '25+', label: isEnglish ? 'Years Experience' : 'Jaar Ervaring' },
    { number: '500+', label: isEnglish ? 'Projects' : 'Projecten' },
    { number: '50+', label: isEnglish ? 'Employees' : 'Medewerkers' },
    { number: '98%', label: isEnglish ? 'Recycling' : 'Recycling' },
  ]

  const values = pageData?.values || [
    {
      icon: 'Shield',
      title: isEnglish ? 'Safety' : 'Veiligheid',
      description: isEnglish
        ? 'Safety always comes first. We work according to VCA** and maintain the highest safety standards on all our projects.'
        : 'Veiligheid staat altijd voorop. Wij werken volgens VCA** en hanteren de hoogste veiligheidsnormen op al onze projecten.',
    },
    {
      icon: 'Target',
      title: isEnglish ? 'Quality' : 'Kwaliteit',
      description: isEnglish
        ? 'We deliver quality work, on time and within budget. Our clients can count on professional execution.'
        : 'Wij leveren kwaliteitswerk, op tijd en binnen budget. Onze klanten kunnen rekenen op professionele uitvoering.',
    },
    {
      icon: 'Heart',
      title: isEnglish ? 'Sustainability' : 'Duurzaamheid',
      description: isEnglish
        ? 'With 98% recycling of demolition waste, we contribute to a circular economy and a cleaner future.'
        : 'Met 98% recycling van sloopafval dragen wij bij aan een circulaire economie en een schonere toekomst.',
    },
    {
      icon: 'Users',
      title: isEnglish ? 'Craftsmanship' : 'Vakmanschap',
      description: isEnglish
        ? 'Our team consists of experienced professionals who are proud of their work and always strive for the best result.'
        : 'Ons team bestaat uit ervaren vakmensen die trots zijn op hun werk en altijd streven naar het beste resultaat.',
    },
  ]

  const timeline = pageData?.timeline || [
    {
      year: '1999',
      title: isEnglish ? 'Foundation' : 'Oprichting',
      description: isEnglish
        ? 'TitanBrekers founded in Rotterdam'
        : 'TitanBrekers wordt opgericht in Rotterdam',
    },
    {
      year: '2005',
      title: isEnglish ? 'VCA Certification' : 'VCA Certificering',
      description: isEnglish ? 'Achieved VCA** certification' : 'Behalen van VCA** certificering',
    },
    {
      year: '2010',
      title: isEnglish ? 'SC-530 Recognition' : 'SC-530 Erkenning',
      description: isEnglish
        ? 'Recognition for asbestos removal'
        : 'Erkenning voor asbestverwijdering',
    },
    {
      year: '2015',
      title: isEnglish ? 'National Coverage' : 'Landelijke Dekking',
      description: isEnglish
        ? 'Expansion throughout the Netherlands'
        : 'Uitbreiding naar heel Nederland',
    },
    {
      year: '2020',
      title: isEnglish ? '50 Employees' : '50 Medewerkers',
      description: isEnglish ? 'Growth to 50+ professionals' : 'Groei naar 50+ vakmensen',
    },
    {
      year: '2024',
      title: isEnglish ? '500+ Projects' : '500+ Projecten',
      description: isEnglish
        ? 'Milestone of 500 successful projects'
        : 'Mijlpaal van 500 succesvolle projecten',
    },
  ]

  const certifications = isEnglish
    ? [
        'VCA** Certified',
        'SC-530 Asbestos Removal',
        'ISO 9001 Quality Management',
        'ISO 14001 Environmental Management',
        'Recognized Training Company',
        'Member Demolition Companies Association',
      ]
    : [
        'VCA** Gecertificeerd',
        'SC-530 Asbestverwijdering',
        'ISO 9001 Kwaliteitsmanagement',
        'ISO 14001 Milieumanagement',
        'Erkend Leerbedrijf',
        'Lid Vereniging Sloopbedrijven',
      ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 min-h-[500px] flex items-center">
        {/* Background Image */}
        {hero.backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={hero.backgroundImage.url || `/api/media/file/${hero.backgroundImage.filename}`}
              alt={hero.backgroundImage.alt || 'TitanBreakers team'}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {isEnglish ? 'About Us' : 'Over Ons'}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              {hero.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-gradient">{hero.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-muted-foreground text-lg">{hero.description}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl mb-6 text-foreground">
                {story.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-gradient">{story.title.split(' ').slice(-1)}</span>
              </h2>
              {story.paragraphs.map((para: any, idx: number) => (
                <p key={idx} className="text-muted-foreground text-lg mb-6">
                  {para.text}
                </p>
              ))}
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className={`card-industrial p-8 text-center ${idx % 2 === 1 ? 'mt-8' : ''}`}
                  >
                    <div className="font-display text-5xl text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl mb-4 text-foreground">
              {isEnglish ? 'OUR ' : 'ONZE '}
              <span className="text-gradient">{isEnglish ? 'VALUES' : 'WAARDEN'}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {isEnglish
                ? 'These core values form the foundation of everything we do.'
                : 'Deze kernwaarden vormen de basis van alles wat wij doen.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: any) => {
              const Icon = getIconComponent(value.icon)
              return (
                <div key={value.title} className="card-industrial text-center">
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl mb-4 text-foreground">
              {isEnglish ? 'OUR ' : 'ONZE '}
              <span className="text-gradient">{isEnglish ? 'HISTORY' : 'GESCHIEDENIS'}</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item: any, index: number) => (
              <div key={item.year} className="flex gap-8 mb-8 last:mb-0">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="font-display text-2xl text-primary">{item.year}</span>
                </div>
                <div className="relative pb-8">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full" />
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-px h-full bg-border" />
                  )}
                  <div className="pl-8">
                    <h3 className="font-display text-xl text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl mb-4 text-foreground">
              {isEnglish ? 'CERTIFICATIONS & ' : 'CERTIFICERINGEN & '}
              <span className="text-gradient">{isEnglish ? 'RECOGNITIONS' : 'ERKENNINGEN'}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {isEnglish
                ? 'We meet the highest standards in safety, quality, and environment.'
                : 'Wij voldoen aan de hoogste eisen op het gebied van veiligheid, kwaliteit en milieu.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert} className="card-industrial flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  )
}
