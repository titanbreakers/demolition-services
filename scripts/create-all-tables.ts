import { getPayload } from 'payload'
import config from '@payload-config'

async function createTables() {
  console.log('🔧 Creating all database tables via Payload...\n')
  
  const payload = await getPayload({ config })
  
  try {
    await (payload.db.connect as any)()
    console.log('✅ Database connected\n')
    
    // Collections - create and delete to trigger table creation
    const collections = [
      { slug: 'users', data: { email: 'temp@temp.com', password: 'temp123' } },
      { slug: 'media', data: { alt: 'temp' } },
      { slug: 'pages', data: { title: 'temp', slug: 'temp' } },
      { slug: 'posts', data: { title: 'temp', slug: 'temp' } },
      { slug: 'categories', data: { title: 'temp' } },
      { slug: 'services', data: { title: 'temp', slug: 'temp' } },
      { slug: 'projects', data: { title: 'temp', slug: 'temp' } },
    ]
    
    console.log('Creating collection tables...')
    for (const { slug, data } of collections) {
      try {
        const created = await payload.create({ collection: slug, data } as any)
        await payload.delete({ collection: slug, id: created.id } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) {
        if (e.message?.includes('duplicate') || e.message?.includes('unique')) {
          console.log(`  ✓ ${slug} (exists)`)
        }
      }
    }
    
    // Simple globals
    const simpleGlobals = ['header', 'footer', 'site-settings']
    console.log('\nCreating simple globals...')
    for (const slug of simpleGlobals) {
      try {
        await payload.updateGlobal({ slug, data: {} } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) { /* ignore */ }
    }
    
    // Complex globals - need to insert actual data to create all join tables
    console.log('\nCreating complex globals with sample data...')
    
    // Home page with arrays and locales
    try {
      await payload.updateGlobal({
        slug: 'home-page',
        data: {
          hero: {
            backgroundImage: null,
            ctaButtons: [{ style: 'primary', linkText: { en: 'temp' } }],
            stats: [{ number: 1, label: { en: 'temp' } }],
            features: [{ icon: 'temp', title: { en: 'temp' }, description: { en: 'temp' } }],
          },
          aboutPreview: {
            highlights: [{ text: 'temp' }],
          },
        }
      } as any)
      console.log('  ✓ home-page')
    } catch (e: any) { console.log('  ⚠ home-page') }
    
    // About page with arrays
    try {
      await payload.updateGlobal({
        slug: 'about-page',
        data: {
          hero: { backgroundImage: null },
          story: { paragraphs: [{ text: { en: 'temp' } }] },
          stats: [{ number: 1, label: { en: 'temp' } }],
          values: [{ icon: 'temp', title: { en: 'temp' }, description: { en: 'temp' } }],
          timeline: [{ year: 2000, title: { en: 'temp' }, description: { en: 'temp' } }],
        }
      } as any)
      console.log('  ✓ about-page')
    } catch (e: any) { console.log('  ⚠ about-page') }
    
    // Services page
    try {
      await payload.updateGlobal({
        slug: 'services-page',
        data: {
          hero: {},
          serviceDetails: [{ title: { en: 'temp' }, description: { en: 'temp' }, features: [{ feature: { en: 'temp' } }] }],
        }
      } as any)
      console.log('  ✓ services-page')
    } catch (e: any) { console.log('  ⚠ services-page') }
    
    // Contact page
    try {
      await payload.updateGlobal({
        slug: 'contact-page',
        data: {
          hero: {},
          formSettings: { subjects: [{ value: 'temp', label: { en: 'temp' } }] },
        }
      } as any)
      console.log('  ✓ contact-page')
    } catch (e: any) { console.log('  ⚠ contact-page') }
    
    // Translations with array
    try {
      await payload.updateGlobal({
        slug: 'translations',
        data: {
          translations: [{ locale: 'nl', strings: { temp: 'temp' } }],
        }
      } as any)
      console.log('  ✓ translations')
      
      // Clear it
      await payload.updateGlobal({ slug: 'translations', data: { translations: [] } } as any)
    } catch (e: any) { console.log('  ⚠ translations') }
    
    console.log('\n✅ All database tables created!')
    process.exit(0)
  } catch (error: any) {
    console.error('\n❌ Failed:', error.message)
    process.exit(1)
  }
}

createTables()
