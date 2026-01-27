'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Clock, Award } from 'lucide-react'
import Image from 'next/image'

interface HeroData {
  title: string
  subtitle: string
  description: string
  backgroundImage?: {
    url?: string
    alt?: string
  }
  ctaButtons: Array<{
    text: string
    url: string
    style: string
  }>
  stats: Array<{
    number: string
    label: string
  }>
  features: Array<{
    icon: string
    title: string
    description: string
  }>
}

interface HeroProps {
  data?: HeroData
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  // Fallback data if no CMS data
  const fallbackData = {
    backgroundImage: {
      url: '/hero-demolition.jpg',
      alt: 'Demolition equipment and machinery',
    },
    title: 'KRACHT IN',
    subtitle: 'SLOOPWERK',
    description:
      'TitanBrekers is uw betrouwbare partner voor professioneel sloop- en demontagewerk. Met meer dan 25 jaar ervaring maken wij ruimte voor uw toekomst.',
    ctaButtons: [
      { text: 'Gratis Offerte', url: '/contact', style: 'primary' },
      { text: 'Bekijk Projecten', url: '/projecten', style: 'secondary' },
    ],
    stats: [
      { number: '25+', label: 'Jaar Ervaring' },
      { number: '500+', label: 'Projecten' },
      { number: '100%', label: 'Veilig' },
    ],
    features: [
      { icon: 'Clock', title: 'Snelle Respons', description: 'Binnen 24 uur reactie' },
      { icon: 'Shield', title: 'Volledig Verzekerd', description: 'Tot €5 miljoen dekking' },
      { icon: 'Award', title: 'VCA Gecertificeerd', description: 'Hoogste veiligheidsnormen' },
    ],
  }

  const heroData: HeroData = {
    title: data?.title || fallbackData.title,
    subtitle: data?.subtitle || fallbackData.subtitle,
    description: data?.description || fallbackData.description,
    backgroundImage: data?.backgroundImage,
    ctaButtons: data?.ctaButtons || fallbackData.ctaButtons,
    stats: data?.stats || fallbackData.stats,
    features: data?.features || fallbackData.features,
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-6 h-6 text-primary" />
      case 'Shield':
        return <Shield className="w-6 h-6 text-primary" />
      case 'Award':
        return <Award className="w-6 h-6 text-primary" />
      default:
        return <Shield className="w-6 h-6 text-primary" />
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: heroData.backgroundImage?.url
            ? `url(${heroData.backgroundImage.url})`
            : `url('/hero-demolition.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-20 pb-24 sm:pt-32 sm:pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-2 mb-6 sm:px-4 sm:mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              Gecertificeerd & Verzekerd
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none mb-4 sm:mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            {heroData.title}
            <br />
            <span className="text-gradient">{heroData.subtitle}</span>
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg sm:text-xl text-muted-foreground max-w-xl mb-6 sm:mb-10 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {heroData.description}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            {heroData.ctaButtons.map((button, index) => (
              <Link
                key={index}
                href={button.url}
                className={
                  button.style === 'primary'
                    ? 'btn-power flex items-center gap-2 justify-center sm:justify-start'
                    : 'btn-outline-power justify-center sm:justify-start'
                }
              >
                {button.text}
                {button.style === 'primary' && <ArrowRight className="w-5 h-5" />}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {heroData.stats.map((stat, index) => (
              <div key={index} className="border-l-2 border-primary pl-4 sm:pl-4">
                <div className="font-display text-3xl sm:text-4xl text-foreground">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {heroData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {getIcon(feature.icon)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base text-foreground truncate">
                    {feature.title}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
