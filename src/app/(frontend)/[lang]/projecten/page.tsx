import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProjectenClient from './page.client'

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

export default async function Projecten({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = supportedLocales.includes(lang) ? lang : 'nl'

  let projects: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    const projectsData = await payload.find({
      collection: 'projects',
      sort: '-completed',
      limit: 100,
      depth: 1,
      locale: locale as any,
    })
    projects = projectsData.docs
  } catch (error) {
    console.error('Error fetching projects:', error)
  }

  return <ProjectenClient projects={projects} />
}
