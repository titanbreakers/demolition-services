import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DienstenClient from './page.client'

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

export default async function Diensten({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = supportedLocales.includes(lang) ? lang : 'nl'

  let pageData: any = null
  let servicesData: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch the services page global data with locale
    pageData = await payload.findGlobal({
      slug: 'services-page',
      locale: locale as any,
    })

    // Fetch the actual services from the collection with locale
    const services = await payload.find({
      collection: 'services',
      sort: 'featured DESC, title ASC',
      depth: 1,
      locale: locale as any,
    })

    servicesData = services.docs || []
  } catch (error) {
    console.error('Error fetching services data:', error)
  }

  return <DienstenClient pageData={pageData} services={servicesData} />
}
