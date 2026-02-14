import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import AboutPreview from '@/components/AboutPreview'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const dynamic = 'force-dynamic'

// Supported locales
const supportedLocales = [
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

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = supportedLocales.includes(lang) ? lang : 'nl'

  let homePageData: any = null
  let services: any[] = []
  let projects: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    // Get featured services with explicit locale
    const servicesData = await payload.find({
      collection: 'services',
      where: {
        featured: {
          equals: true,
        },
      },
      sort: '-createdAt',
      depth: 1,
      locale: locale as any,
    })

    services = servicesData.docs

    // Get projects
    const projectsData = await payload.find({
      collection: 'projects',
      where: {
        featured: {
          equals: true,
        },
      },
      sort: '-completed',
      limit: 6,
      depth: 1,
      locale: locale as any,
    })

    projects = projectsData.docs

    // Get home page global data
    homePageData = await payload.findGlobal({
      slug: 'home-page',
      locale: locale as any,
    })
  } catch (error) {
    console.error('Error fetching CMS data:', error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero data={homePageData?.hero} />
      <Services services={services} />
      <Projects projects={projects} />
      <AboutPreview data={homePageData?.aboutPreview} />
      <CTA />
      <Footer />
    </main>
  )
}
