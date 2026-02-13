import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { translations, type Locale } from '@/utilities/translations'

export const dynamic = 'force-dynamic'

interface BlogPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = (lang === 'en' ? 'en' : 'nl') as Locale

  return {
    title: `${locale === 'nl' ? 'Nieuws' : 'Blog'} | TitanBreakers`,
    description:
      locale === 'nl'
        ? 'Lees het laatste nieuws en blogs over sloopwerkzaamheden, renovaties en meer.'
        : 'Read the latest news and blogs about demolition work, renovations, and more.',
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params
  const locale = (lang === 'en' ? 'en' : 'nl') as Locale
  const t = translations[locale] as any

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
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
                {locale === 'nl' ? 'Laatste Nieuws' : 'Latest News'}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              {locale === 'nl' ? 'NIEUWS' : 'BLOG'}{' '}
              <span className="text-gradient">& {locale === 'nl' ? 'ARTIKELEN' : 'ARTICLES'}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'nl'
                ? 'Blijf op de hoogte van het laatste nieuws, tips en inzichten over sloopwerkzaamheden en renovaties.'
                : 'Stay up to date with the latest news, tips, and insights about demolition work and renovations.'}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {posts.totalDocs > 0 ? (
            <>
              <div className="mb-8">
                <PageRange
                  collection="posts"
                  currentPage={posts.page}
                  limit={12}
                  totalDocs={posts.totalDocs}
                />
              </div>

              <CollectionArchive posts={posts.docs} />

              {posts.totalPages > 1 && posts.page && (
                <div className="mt-12">
                  <Pagination page={posts.page} totalPages={posts.totalPages} />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {locale === 'nl'
                  ? 'Er zijn nog geen artikelen geplaatst.'
                  : 'No articles have been posted yet.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
