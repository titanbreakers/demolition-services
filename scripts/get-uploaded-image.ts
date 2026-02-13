import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const { default: config } = await import(path.join(__dirname, '..', 'src', 'payload.config.ts'))

async function downloadImageFromPayload() {
  console.log('🔍 Checking for interior-demolition.png in Payload CMS...\n')

  const payload = await getPayload({ config })

  try {
    // Find the image in Payload
    const media = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'interior-demolition.png',
        },
      },
      limit: 1,
    })

    if (media.docs.length === 0) {
      console.log('❌ Image "interior-demolition.png" not found in Payload CMS')
      console.log('\n📂 Checking /public folder...')

      const publicDir = path.join(__dirname, '..', 'public')
      const publicPath = path.join(publicDir, 'interior-demolition.png')

      if (fs.existsSync(publicPath)) {
        console.log('✅ Found in /public folder!')
        console.log('   Location:', publicPath)
      } else {
        console.log('❌ Not found in /public folder either')
        console.log('\n💡 Where did you upload the image?')
        console.log('   - If in Payload Admin: Check http://localhost:3000/admin/collections/media')
        console.log('   - If elsewhere: Please move it to /public folder')
      }
      return
    }

    const image = media.docs[0]
    console.log('✅ Found image in Payload CMS:')
    console.log('   ID:', image.id)
    console.log('   Filename:', image.filename)
    console.log('   URL:', image.url)
    console.log('   Size:', image.filesize ? `${Math.round(image.filesize / 1024)}KB` : 'Unknown')

    // Download the image to public folder
    const publicDir = path.join(__dirname, '..', 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    const outputPath = path.join(publicDir, 'interior-demolition.png')

    console.log('\n📥 Downloading to /public folder...')

    // Construct full URL
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const imageUrl = image.url?.startsWith('http') ? image.url : `${baseUrl}${image.url}`

    const file = fs.createWriteStream(outputPath)

    https
      .get(imageUrl, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file)
          file.on('finish', () => {
            file.close()
            console.log('✅ Downloaded to:', outputPath)
            console.log('\n👉 Now run: pnpm seed:all')
            console.log('   This will set it as the hero image!')
            process.exit(0)
          })
        } else {
          console.error('❌ Failed to download:', response.statusCode)
          process.exit(1)
        }
      })
      .on('error', (err) => {
        console.error('❌ Error downloading:', err.message)
        process.exit(1)
      })
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

downloadImageFromPayload()
