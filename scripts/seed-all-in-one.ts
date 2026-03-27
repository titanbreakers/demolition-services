import { getPayload } from 'payload'
import config from '@payload-config'
import { execSync } from 'child_process'

async function seedAll() {
  console.log('🌱 Starting complete database seed...\n')
  
  const payload = await getPayload({ config })
  
  try {
    await (payload.db.connect as any)()
    console.log('✅ Database connected\n')
    
    // Create all tables by inserting/deleting dummy data in each collection
    console.log('Creating database tables...')
    
    const collections = [
      { slug: 'users', data: { email: 'temp@temp.com', password: 'temp123' } },
      { slug: 'media', data: { alt: 'temp' } },
      { slug: 'pages', data: { title: 'temp', slug: 'temp' } },
      { slug: 'posts', data: { title: 'temp', slug: 'temp' } },
      { slug: 'categories', data: { title: 'temp' } },
      { slug: 'services', data: { title: 'temp', slug: 'temp' } },
      { slug: 'projects', data: { title: 'temp', slug: 'temp' } },
    ]
    
    for (const { slug, data } of collections) {
      try {
        const created = await payload.create({ collection: slug, data } as any)
        await payload.delete({ collection: slug, id: created.id } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) {
        if (!e.message?.includes('duplicate') && !e.message?.includes('unique')) {
          console.log(`  ⚠ ${slug}: ${e.message?.substring(0, 50)}`)
        }
      }
    }
    
    // Create globals with data to trigger join table creation
    console.log('\nCreating global tables...')
    
    const globalsWithData = [
      { slug: 'header', data: {} },
      { slug: 'footer', data: {} },
      { slug: 'site-settings', data: {} },
      { slug: 'home-page', data: { hero: { ctaButtons: [{ style: 'primary' }], stats: [{ number: 1 }], features: [{ icon: 'temp' }] }, aboutPreview: { highlights: [{ text: 'temp' }] } } },
      { slug: 'about-page', data: { story: { paragraphs: [{ text: {} }], stats: [{ number: 1 }], values: [{ icon: 'temp' }], timeline: [{ year: 2000 }] } } },
      { slug: 'services-page', data: { serviceDetails: [{ title: {}, description: {}, features: [{ feature: {} }] }] } },
      { slug: 'contact-page', data: { formSettings: { subjects: [{ value: 'temp', label: {} }] } } },
      { slug: 'translations', data: { translations: [{ locale: 'nl', strings: { temp: 'temp' } }] } },
    ]
    
    for (const { slug, data } of globalsWithData) {
      try {
        await payload.updateGlobal({ slug, data } as any)
        console.log(`  ✓ ${slug}`)
      } catch (e: any) {
        console.log(`  ⚠ ${slug}: ${e.message?.substring(0, 50)}`)
      }
    }
    
    // Clear the temp data from translations
    try {
      await payload.updateGlobal({ slug: 'translations', data: { translations: [] } } as any)
    } catch (e: any) { /* ignore */ }
    
    console.log('\n✅ All tables created!\n')
    
    // Disconnect and reconnect to refresh schema
    await (payload.db.disconnect as any)()
    await (payload.db.connect as any)()
    
    // Now run the actual seed scripts
    console.log('📝 Seeding translations...')
    execSync('pnpm seed:translations', { stdio: 'inherit' })
    
    console.log('\n📝 Seeding CMS content...')
    execSync('pnpm seed:cms-content', { stdio: 'inherit' })
    
    console.log('\n📝 Seeding database...')
    execSync('cross-env NODE_OPTIONS=--no-deprecation tsx scripts/seed-database.mjs', { stdio: 'inherit' })
    
    console.log('\n✅ Database seeded successfully!')
    process.exit(0)
  } catch (error: any) {
    console.error('\n❌ Seed failed:', error.message)
    process.exit(1)
  }
}

seedAll()
