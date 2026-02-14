import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'nl'

  try {
    const payload = await getPayload({ config })

    const translations = await payload.findGlobal({
      slug: 'translations',
    })

    const localeData = translations.translations?.find((t: any) => t.locale === locale)

    if (!localeData) {
      return NextResponse.json({ error: 'Translations not found for locale' }, { status: 404 })
    }

    return NextResponse.json(localeData.strings || {})
  } catch (error) {
    console.error('Error fetching translations:', error)
    return NextResponse.json({ error: 'Failed to fetch translations' }, { status: 500 })
  }
}
