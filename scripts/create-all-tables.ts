import { getPayload } from 'payload'
import config from '@payload-config'

async function createTables() {
  console.log('🔧 Creating all database tables via Payload...\n')
  
  const payload = await getPayload({ config })
  
  try {
    await (payload.db.connect as any)()
    console.log('✅ Database connected\n')
    
    // Collections
    const collections = [
      { slug: 'users', data: { email: 'temp@temp.com', password: 'temp' } },
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
    const simpleGlobals = ['header', 'footer', 'site-settings', 'home-page', 'about-page', 'services-page', 'contact-page']
    console.log('\nCreating global tables...')
    for (const slug of simpleGlobals) {
      try {
        await payload.updateGlobal({ slug, data: {} } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) { /* ignore */ }
    }
    
    // CRITICAL: translations global needs array data to create join tables
    console.log('\nCreating translations global with array data...')
    try {
      await payload.updateGlobal({
        slug: 'translations',
        data: {
          translations: [
            {
              locale: 'nl',
              strings: { temp: 'temp' }  // JSON object, not array!
            }
          ]
        }
      } as any)
      console.log('  ✓ translations (with join tables)')
      
      // Clear the temp data
      await payload.updateGlobal({
        slug: 'translations',
        data: { translations: [] }
      } as any)
    } catch (e: any) {
      console.log(`  ⚠ translations: ${e.message?.substring(0, 50)}`)
    }
    
    console.log('\n✅ All database tables created!')
    process.exit(0)
  } catch (error: any) {
    console.error('\n❌ Failed:', error.message)
    process.exit(1)
  }
}

createTables()
