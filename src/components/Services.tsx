'use client'

import Link from 'next/link'
import {
  Building2,
  Factory,
  Trash2,
  Recycle,
  Shovel,
  ArrowRight,
  Hammer,
  Leaf,
  Shield,
} from 'lucide-react'
import type { Service } from '@/payload-types'
import { useTranslation } from '@/hooks/useTranslation'

interface ServicesProps {
  services?: Service[]
}

const Services: React.FC<ServicesProps> = ({ services = [] }) => {
  const { t, locale } = useTranslation()

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'WreckingBall':
        return Hammer
      case 'Shield':
        return Shield
      case 'Recycle':
        return Recycle
      case 'Leaf':
        return Leaf
      case 'Building2':
        return Building2
      case 'Factory':
        return Factory
      case 'Trash2':
        return Trash2
      case 'Shovel':
        return Shovel
      default:
        return Building2
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-2 mb-4 sm:px-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              {t.sections?.ourServices || (locale === 'en' ? 'Our Services' : 'Onze Diensten')}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            {locale === 'en' ? (
              <>
                PROFESSIONAL <span className="text-gradient">DEMOLITION</span>
              </>
            ) : (
              <>
                PROFESSIONEEL <span className="text-gradient">SLOOPWERK</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t.services?.description ||
              (locale === 'en'
                ? 'From small strip-outs to complete building demolition - we have the expertise and equipment for every project.'
                : 'Van kleine stripwerken tot complete gebouwsloop - wij hebben de expertise en het materieel voor elk project.')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon || 'Building2')
            return (
              <div
                key={service.id}
                className="card-industrial group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary transition-colors">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl mb-2 sm:mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">{locale === 'en' ? 'More Info' : 'Meer Info'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href={locale === 'en' ? '/services' : '/diensten'}
            className="btn-power inline-flex items-center gap-2"
          >
            {t.cta?.viewAllServices ||
              (locale === 'en' ? 'View All Services' : 'Alle Diensten Bekijken')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
