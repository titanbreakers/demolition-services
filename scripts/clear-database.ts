import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '..', '.env') })

// Dynamically import config after env is loaded
const { default: config } = await import(path.join(__dirname, '..', 'src', 'payload.config.ts'))

async function clearDatabase() {
  console.log('🗑️  Clearing database content...')

  // Clear public/media folder
  const mediaPath = path.join(__dirname, '..', 'public', 'media')
  if (fs.existsSync(mediaPath)) {
    console.log('\n🗑️  Clearing public/media folder...')
    const files = fs.readdirSync(mediaPath)
    for (const file of files) {
      fs.unlinkSync(path.join(mediaPath, file))
    }
    console.log(`  ✓ Deleted ${files.length} files from public/media`)
  }

  const payload = await getPayload({ config })

  try {
    // Clear Media collection
    console.log('\n🗑️  Clearing Media...')
    const media = await payload.find({
      collection: 'media',
      limit: 1000,
    })
    for (const item of media.docs) {
      try {
        await payload.delete({
          collection: 'media',
          id: item.id,
          context: { skipRevalidation: true },
        })
      } catch (e) {
        console.log(`  ⚠️  Skipped revalidation for media`)
      }
    }
    console.log(`  ✓ Deleted ${media.docs.length} media items`)

    // Clear Services
    console.log('\n🗑️  Clearing Services...')
    const services = await payload.find({
      collection: 'services',
      limit: 1000,
    })
    for (const service of services.docs) {
      try {
        await payload.delete({
          collection: 'services',
          id: service.id,
          context: { skipRevalidation: true },
        })
      } catch (e) {
        console.log(`  ⚠️  Skipped revalidation for service: ${service.title}`)
      }
    }
    console.log(`  ✓ Deleted ${services.docs.length} services`)

    // Clear Projects
    console.log('\n🗑️  Clearing Projects...')
    const projects = await payload.find({
      collection: 'projects',
      limit: 1000,
    })
    for (const project of projects.docs) {
      try {
        await payload.delete({
          collection: 'projects',
          id: project.id,
          context: { skipRevalidation: true },
        })
      } catch (e) {
        console.log(`  ⚠️  Skipped revalidation for project: ${project.title}`)
      }
    }
    console.log(`  ✓ Deleted ${projects.docs.length} projects`)

    // Clear Categories
    console.log('\n🗑️  Clearing Categories...')
    const categories = await payload.find({
      collection: 'categories',
      limit: 1000,
    })
    for (const category of categories.docs) {
      try {
        await payload.delete({
          collection: 'categories',
          id: category.id,
          context: { skipRevalidation: true },
        })
      } catch (e: any) {
        if (e.message?.includes('static generation store missing')) {
          console.log(
            `  ⚠️  Skipped revalidation for category: ${category.title} (deleted successfully)`,
          )
        } else {
          throw e
        }
      }
    }
    console.log(`  ✓ Deleted ${categories.docs.length} categories`)

    // Clear Posts
    console.log('\n🗑️  Clearing Posts...')
    const posts = await payload.find({
      collection: 'posts',
      limit: 1000,
    })
    for (const post of posts.docs) {
      try {
        await payload.delete({
          collection: 'posts',
          id: post.id,
          context: { skipRevalidation: true },
        })
      } catch (e: any) {
        if (e.message?.includes('static generation store missing')) {
          console.log(`  ⚠️  Skipped revalidation for post: ${post.title} (deleted successfully)`)
        } else {
          throw e
        }
      }
    }
    console.log(`  ✓ Deleted ${posts.docs.length} posts`)

    console.log('\n✅ Database cleared successfully!')
    console.log('\n👉 Next step: Run `pnpm seed:all` to re-seed with fresh content')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error clearing database:', error)
    process.exit(1)
  }
}

clearDatabase()
