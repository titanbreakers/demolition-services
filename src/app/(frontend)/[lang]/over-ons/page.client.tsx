'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { CheckCircle, Users, Target, Heart, Shield } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

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
  const { t, locale } = useTranslation()

  // Use CMS data or fallback with translations
  const hero = pageData?.hero || {
    title: t.about?.title || 'WIE ZIJN WIJ',
    description:
      t.about?.description ||
      'Al meer dan 25 jaar is TitanBrekers dé specialist in professioneel sloopwerk. Met passie, vakmanschap en moderne apparatuur maken wij ruimte voor de toekomst.',
  }

  const story = pageData?.story || {
    title: t.about?.storyTitle || 'ONS VERHAAL',
    paragraphs: [
      {
        text:
          t.about?.story1 ||
          'TitanBrekers werd in 1999 opgericht door twee ervaren slopers met een duidelijke missie: professioneel sloopwerk leveren met oog voor veiligheid, kwaliteit en milieu.',
      },
      {
        text:
          t.about?.story2 ||
          'Wat begon als een klein familiebedrijf is uitgegroeid tot een van de meest gerespecteerde sloopbedrijven van Nederland. Met meer dan 50 medewerkers, een modern machinepark en alle benodigde certificeringen pakken wij elk project aan - groot of klein.',
      },
      {
        text:
          t.about?.story3 ||
          'Onze kracht zit in ons team. Ervaren vakmensen die trots zijn op hun werk en altijd streven naar het beste resultaat. Samen met onze opdrachtgevers vinden wij oplossingen voor de meest complexe sloopprojecten.',
      },
    ],
  }

  const stats = pageData?.stats || [
    { number: '25+', label: t.about?.years || 'Jaar Ervaring' },
    { number: '500+', label: t.about?.projects || 'Projecten' },
    { number: '50+', label: t.about?.employees || 'Medewerkers' },
    { number: '98%', label: t.about?.recycling || 'Recycling' },
  ]

  const values = pageData?.values || [
    {
      icon: 'Shield',
      title: t.about?.safety || 'Veiligheid',
      description:
        t.about?.safetyDesc ||
        'Veiligheid staat altijd voorop. Wij werken volgens VCA** en hanteren de hoogste veiligheidsnormen op al onze projecten.',
    },
    {
      icon: 'Target',
      title: t.about?.quality || 'Kwaliteit',
      description:
        t.about?.qualityDesc ||
        'Wij leveren kwaliteitswerk, op tijd en binnen budget. Onze klanten kunnen rekenen op professionele uitvoering.',
    },
    {
      icon: 'Heart',
      title: t.about?.sustainability || 'Duurzaamheid',
      description:
        t.about?.sustainabilityDesc ||
        'Met 98% recycling van sloopafval dragen wij bij aan een circulaire economie en een schonere toekomst.',
    },
    {
      icon: 'Users',
      title: t.about?.craftsmanship || 'Vakmanschap',
      description:
        t.about?.craftsmanshipDesc ||
        'Ons team bestaat uit ervaren vakmensen die trots zijn op hun werk en altijd streven naar het beste resultaat.',
    },
  ]

  const timeline = pageData?.timeline || [
    {
      year: '1999',
      title: t.about?.foundation || 'Oprichting',
      description: t.about?.foundationDesc || 'TitanBrekers wordt opgericht in Rotterdam',
    },
    {
      year: '2005',
      title: t.about?.vca || 'VCA Certificering',
      description: t.about?.vcaDesc || 'Behalen van VCA** certificering',
    },
    {
      year: '2010',
      title: t.about?.sc530 || 'SC-530 Erkenning',
      description: t.about?.sc530Desc || 'Erkenning voor asbestverwijdering',
    },
    {
      year: '2015',
      title: t.about?.national || 'Landelijke Dekking',
      description: t.about?.nationalDesc || 'Uitbreiding naar heel Nederland',
    },
    {
      year: '2020',
      title: t.about?.employees50 || '50 Medewerkers',
      description: t.about?.employees50Desc || 'Groei naar 50+ vakmensen',
    },
    {
      year: '2024',
      title: t.about?.projects500 || '500+ Projecten',
      description: t.about?.projects500Desc || 'Mijlpaal van 500 succesvolle projecten',
    },
  ]

  const certifications = [
    t.about?.vcaCert || 'VCA** Gecertificeerd',
    t.about?.sc530Cert || 'SC-530 Asbestverwijdering',
    t.about?.iso9001 || 'ISO 9001 Kwaliteitsmanagement',
    t.about?.iso14001 || 'ISO 14001 Milieumanagement',
    t.about?.training || 'Erkend Leerbedrijf',
    t.about?.association || 'Lid Vereniging Sloopbedrijven',
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className="relative flex items-center w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        style={{ aspectRatio: '16/9', maxHeight: '70vh' }}
      >
        {/* Background Image */}
        {hero.backgroundImage && (
          <div className="absolute inset-0 z-0 w-full h-full">
            <img
              src={hero.backgroundImage.url || `/api/media/file/${hero.backgroundImage.filename}`}
              alt={hero.backgroundImage.alt || 'TitanBreakers team'}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {locale === 'en' ? 'About Us' : 'Over Ons'}
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
              {locale === 'en' ? 'OUR ' : 'ONZE '}
              <span className="text-gradient">{locale === 'en' ? 'VALUES' : 'WAARDEN'}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {locale === 'en'
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
              {locale === 'en' ? 'OUR ' : 'ONZE '}
              <span className="text-gradient">{locale === 'en' ? 'HISTORY' : 'GESCHIEDENIS'}</span>
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
              {locale === 'en' ? 'CERTIFICATIONS & ' : 'CERTIFICERINGEN & '}
              <span className="text-gradient">
                {locale === 'en' ? 'RECOGNITIONS' : 'ERKENNINGEN'}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {locale === 'en'
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
