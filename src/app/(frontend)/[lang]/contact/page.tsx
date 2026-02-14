import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ContactClient from './page.client'

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

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = supportedLocales.includes(lang) ? lang : 'nl'

  let pageData: any = null
  let siteSettings: any = null

  try {
    const payload = await getPayload({ config: configPromise })

    pageData = await payload.findGlobal({
      slug: 'contact-page',
      locale: locale as any,
    })
    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      locale: locale as any,
    })
  } catch (error) {
    console.error('Error fetching contact page data:', error)
  }

  return <ContactClient pageData={pageData} siteSettings={siteSettings} />
}
