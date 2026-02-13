'use client'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Fragment } from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import type { Locale } from '@/utilities/translations'

export type BlogCardData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

const localePathMap: Record<Locale, string> = {
  nl: '/nieuws',
  en: '/blog',
  fr: '/actualites',
  de: '/neuigkeiten',
  it: '/notizie',
  es: '/noticias',
  sv: '/nyheter',
  fi: '/uutiset',
  pl: '/aktualnosci',
  ar: '/akhbar',
  zh: '/xinwen',
  ja: '/nyusu',
  pt: '/noticias',
  tr: '/haberler',
  ru: '/novosti',
}

const supportedLocales: Locale[] = [
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

export const BlogCard: React.FC<{
  className?: string
  doc?: BlogCardData
  showCategories?: boolean
  locale?: Locale
}> = (props) => {
  const { className, doc, showCategories, locale: propLocale } = props
  const pathname = usePathname()

  // Get locale from URL path or prop
  const pathParts = pathname.split('/').filter(Boolean)
  const urlLocale = pathParts[0]
  const locale =
    propLocale || (supportedLocales.includes(urlLocale as Locale) ? (urlLocale as Locale) : 'nl')

  const { slug, categories, meta, title, heroImage } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  // Create localized href
  const blogPath = localePathMap[locale]
  const href = `/${locale}${blogPath}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer transition-all hover:shadow-lg',
        className,
      )}
    >
      <div className="relative w-full aspect-video">
        {!heroImage && (
          <div className="bg-muted w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        {heroImage && typeof heroImage !== 'string' && <Media resource={heroImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                return (
                  <span
                    key={index}
                    className="inline-flex items-center bg-primary/10 text-primary px-2 py-1 text-xs font-medium uppercase tracking-wider"
                  >
                    {category.title || 'Untitled'}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}
        {title && (
          <h3 className="font-display text-xl mb-2 hover:text-primary transition-colors">
            <Link href={href} className="block">
              {title}
            </Link>
          </h3>
        )}
        {sanitizedDescription && (
          <p className="text-muted-foreground text-sm line-clamp-3">{sanitizedDescription}</p>
        )}
      </div>
    </article>
  )
}
