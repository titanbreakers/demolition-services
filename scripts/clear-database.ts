import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const { default: config } = await import(path.join(__dirname, '..', 'src', 'payload.config.ts'))

async function clearDatabase() {
  console.log('🗑️  Clearing database content...')

  const mediaPath = path.join(__dirname, '..', 'public', 'media')
  if (fs.existsSync(mediaPath)) {
    try {
      const files = fs.readdirSync(mediaPath)
      for (const file of files) {
        fs.unlinkSync(path.join(mediaPath, file))
      }
      console.log(`  ✓ Deleted ${files.length} files from public/media`)
    } catch (e) {
      console.log('  ⚠️  Could not clear media folder')
    }
  }

  const payload = await getPayload({ config })

  const collections = ['media', 'services', 'projects', 'categories', 'posts', 'pages']
  
  for (const collection of collections) {
    try {
      console.log(`\n🗑️  Clearing ${collection}...`)
      const docs = await payload.find({
        collection,
        limit: 1000,
      } as any)
      
      for (const doc of docs.docs) {
        try {
          await payload.delete({
            collection,
            id: doc.id,
            context: { skipRevalidation: true },
          } as any)
        } catch (e: any) {
          console.log(`  ⚠️  Skipped revalidation for ${collection}: ${doc.id}`)
        }
      }
      console.log(`  ✓ Deleted ${docs.docs.length} ${collection} items`)
    } catch (e: any) {
      if (e.message?.includes('does not exist') || e.message?.includes('relation')) {
        console.log(`  ⚠️  Collection ${collection} does not exist yet, skipping...`)
      } else {
        console.log(`  ⚠️  Error clearing ${collection}: ${e.message}`)
      }
    }
  }

  console.log('\n✅ Database cleared successfully!')
  process.exit(0)
}

clearDatabase().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
