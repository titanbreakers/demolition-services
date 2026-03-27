import { getPayload } from 'payload'
import config from '@payload-config'

async function createTables() {
  console.log('🔧 Creating all database tables via Payload...\n')
  
  const payload = await getPayload({ config })
  
  try {
    await (payload.db.connect as any)()
    console.log('✅ Database connected\n')
    
    // Create collections by inserting/deleting dummy data
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
        } else {
          console.log(`  ⚠ ${slug}: ${e.message?.substring(0, 50)}`)
        }
      }
    }
    
    // Create globals by updating them
    const globals = ['header', 'footer', 'site-settings', 'home-page', 'about-page', 'services-page', 'contact-page', 'translations']
    
    console.log('\nCreating global tables...')
    for (const slug of globals) {
      try {
        await payload.updateGlobal({ slug, data: {} } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) {
        console.log(`  ⚠ ${slug}: ${e.message?.substring(0, 50)}`)
      }
    }
    
    console.log('\n✅ All database tables created!')
    process.exit(0)
  } catch (error: any) {
    console.error('\n❌ Failed:', error.message)
    process.exit(1)
  }
}

createTables()
