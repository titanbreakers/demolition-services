import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BlogCard } from '@/components/BlogCard'
import { translations, type Locale } from '@/utilities/translations'

export const dynamic = 'force-dynamic'

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

interface BlogPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = supportedLocales.includes(lang as Locale) ? (lang as Locale) : 'nl'

  return {
    title: `${locale === 'nl' ? 'Nieuws' : locale === 'en' ? 'Blog' : translations[locale].nav.blog} | TitanBreakers`,
    description:
      locale === 'nl'
        ? 'Lees het laatste nieuws en blogs over sloopwerkzaamheden, renovaties en meer.'
        : locale === 'en'
          ? 'Read the latest news and blogs about demolition work, renovations, and more.'
          : translations[locale].sections.blog,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params
  const locale = supportedLocales.includes(lang as Locale) ? (lang as Locale) : 'nl'
  const blogPath = localePathMap[locale]

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    locale: locale as any,
    depth: 2,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      publishedAt: true,
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {locale === 'nl'
                  ? 'Laatste Nieuws'
                  : locale === 'en'
                    ? 'Latest News'
                    : translations[locale].sections.latestNews}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              {locale === 'nl'
                ? 'NIEUWS'
                : locale === 'en'
                  ? 'BLOG'
                  : translations[locale].sections.blog}{' '}
              <span className="text-gradient">
                &{' '}
                {locale === 'nl'
                  ? 'ARTIKELEN'
                  : locale === 'en'
                    ? 'ARTICLES'
                    : translations[locale].sections.readMore.toUpperCase()}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'nl'
                ? 'Blijf op de hoogte van het laatste nieuws, tips en inzichten over sloopwerkzaamheden en renovaties.'
                : locale === 'en'
                  ? 'Stay up to date with the latest news, tips, and insights about demolition work and renovations.'
                  : translations[locale].company.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {posts.totalDocs > 0 ? (
            <>
              <div className="mb-8 text-muted-foreground">
                {locale === 'nl'
                  ? `${posts.totalDocs} artikel${posts.totalDocs !== 1 ? 'en' : ''} gevonden`
                  : locale === 'en'
                    ? `${posts.totalDocs} article${posts.totalDocs !== 1 ? 's' : ''} found`
                    : `${posts.totalDocs} ${translations[locale].sections.blog.toLowerCase()}`}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.docs.map((post) => (
                  <BlogCard key={post.id} doc={post} showCategories locale={locale} />
                ))}
              </div>

              {posts.totalPages > 1 && posts.page && (
                <div className="mt-12 flex justify-center gap-2">
                  {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <a
                      key={pageNum}
                      href={`/${locale}${blogPath}/page/${pageNum}`}
                      className={`px-4 py-2 border ${
                        pageNum === posts.page
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {pageNum}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {locale === 'nl'
                  ? 'Er zijn nog geen artikelen geplaatst.'
                  : locale === 'en'
                    ? 'No articles have been posted yet.'
                    : translations[locale].general.error}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
