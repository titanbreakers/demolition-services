import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { format } from 'date-fns'
import { nl, enUS, fr, de, it, es, sv, fi, pl, ar, zhCN, ja, pt, tr, ru } from 'date-fns/locale'
import type { Locale } from '@/utilities/translations'

const localeMap: Record<string, Locale> = {
  nl: 'nl',
  en: 'en',
  fr: 'fr',
  de: 'de',
  it: 'it',
  es: 'es',
  sv: 'sv',
  fi: 'fi',
  pl: 'pl',
  ar: 'ar',
  zh: 'zh',
  ja: 'ja',
  pt: 'pt',
  tr: 'tr',
  ru: 'ru',
}

const dateLocaleMap: Record<Locale, any> = {
  nl,
  en: enUS,
  fr,
  de,
  it,
  es,
  sv,
  fi,
  pl,
  ar,
  zh: zhCN,
  ja,
  pt,
  tr,
  ru,
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

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = localeMap[lang] || 'nl'

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as any,
    depth: 1,
  })

  const post = posts.docs[0]

  if (!post) {
    return {
      title: locale === 'nl' ? 'Artikel niet gevonden' : 'Article not found',
    }
  }

  return {
    title: `${post.title} | TitanBreakers`,
    description: post.meta?.description || '',
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params
  const locale = localeMap[lang] || 'nl'
  const dateLocale = dateLocaleMap[locale]

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as any,
    depth: 2,
  })

  const post = posts.docs[0]

  if (!post) {
    notFound()
  }

  // Extract plain text from rich content for preview
  const getPlainText = (content: any) => {
    if (!content?.root?.children) return ''
    return (
      content.root.children
        .map((child: any) => {
          if (child.children) {
            return child.children.map((c: any) => c.text || '').join(' ')
          }
          return ''
        })
        .join(' ')
        .slice(0, 200) + '...'
    )
  }

  const plainText = getPlainText(post.content)

  // Get the blog path for the current locale
  const blogPath = locale === 'nl' ? '/nieuws' : '/blog'
  const homeLabel = locale === 'nl' ? 'Home' : 'Home'
  const blogLabel = locale === 'nl' ? 'Nieuws' : 'Blog'
  const backLabel = locale === 'nl' ? 'Terug naar nieuws' : 'Back to blog'
  const publishedLabel = locale === 'nl' ? 'Geplaatst op' : 'Published on'

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 min-h-[400px] flex items-end">
        {post.heroImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={
                typeof post.heroImage === 'object'
                  ? post.heroImage.url || ''
                  : `/api/media/file/${post.heroImage}`
              }
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <a href={`/${lang}`} className="hover:text-primary transition-colors">
                {homeLabel}
              </a>
              <span>/</span>
              <a href={`/${lang}${blogPath}`} className="hover:text-primary transition-colors">
                {blogLabel}
              </a>
              <span>/</span>
              <span className="text-primary">{post.title}</span>
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: any) => (
                  <span
                    key={typeof category === 'object' ? category.id : category}
                    className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 text-sm font-medium"
                  >
                    {typeof category === 'object' ? category.title : category}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">{post.title}</h1>

            {post.publishedAt && (
              <p className="text-muted-foreground">
                {publishedLabel}{' '}
                {format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: dateLocale })}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Post Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content?.root?.children?.map((block: any, index: number) => (
                <div key={index}>
                  {block.type === 'paragraph' && (
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {block.children?.map((child: any, i: number) => (
                        <span key={i}>{child.text}</span>
                      ))}
                    </p>
                  )}
                  {block.type === 'heading' && block.tag === 'h2' && (
                    <h2 className="font-display text-3xl mt-12 mb-6">
                      {block.children?.map((child: any, i: number) => child.text).join('')}
                    </h2>
                  )}
                  {block.type === 'heading' && block.tag === 'h3' && (
                    <h3 className="font-display text-2xl mt-8 mb-4">
                      {block.children?.map((child: any, i: number) => child.text).join('')}
                    </h3>
                  )}
                </div>
              ))}
            </div>

            {/* Back to Blog */}
            <div className="mt-16 pt-8 border-t border-border">
              <a
                href={`/${lang}${blogPath}`}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                {backLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
