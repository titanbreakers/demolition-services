import { getPayload } from 'payload'
import config from '@payload-config'

async function createTables() {
  console.log('📋 Creating database tables...')
  
  const payload = await getPayload({ config })
  
  try {
    // Connect to database
    await (payload.db.connect as any)()
    
    // Access each collection to trigger table creation
    const collections = ['users', 'media', 'pages', 'posts', 'categories', 'services', 'projects']
    const globals = ['header', 'footer', 'site-settings', 'home-page', 'about-page', 'services-page', 'contact-page', 'translations']
    
    console.log('\nCreating collections...')
    for (const slug of collections) {
      try {
        await payload.create({
          collection: slug,
          data: { id: 'temp' } as any,
        } as any)
        await payload.delete({
          collection: slug,
          id: 'temp' as any,
        } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) {
        if (e.message?.includes('duplicate') || e.message?.includes('exists')) {
          console.log(`  ✓ ${slug} (already exists)`)
        } else {
          console.log(`  ⚠ ${slug}: ${e.message}`)
        }
      }
    }
    
    console.log('\nCreating globals...')
    for (const slug of globals) {
      try {
        await payload.updateGlobal({
          slug: slug as any,
          data: { id: 'temp' } as any,
        } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) {
        console.log(`  ⚠ ${slug}: ${e.message}`)
      }
    }
    
    console.log('\n✅ Database tables created!')
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Failed to create tables:', error.message)
    process.exit(1)
  }
}

createTables()
