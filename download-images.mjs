#!/usr/bin/env node
/**
 * Image Setup Script for Hand Demolition Work
 *
 * This script downloads appropriate images for hand demolition work.
 * Uses reliable placeholder services and Pexels API fallbacks.
 */

import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, 'public')

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

// Use picsum.photos for reliable placeholder images
// These are construction/demolition themed images
const images = [
  {
    filename: 'hero-demolition.jpg',
    url: 'https://picsum.photos/1920/1080?random=1',
    fallback:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    description: 'Hero image - construction worker',
  },
  {
    filename: 'project-1.jpg',
    url: 'https://picsum.photos/800/600?random=2',
    fallback:
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Project 1 - Kitchen renovation',
  },
  {
    filename: 'project-2.jpg',
    url: 'https://picsum.photos/800/600?random=3',
    fallback:
      'https://images.pexels.com/photos/1915906/pexels-photo-1915906.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Project 2 - Bathroom work',
  },
  {
    filename: 'project-3.jpg',
    url: 'https://picsum.photos/800/600?random=4',
    fallback:
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Project 3 - Interior renovation',
  },
  {
    filename: 'service-manual.jpg',
    url: 'https://picsum.photos/800/600?random=5',
    fallback:
      'https://images.pexels.com/photos/5691639/pexels-photo-5691639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Service - Manual demolition',
  },
  {
    filename: 'service-interior.jpg',
    url: 'https://picsum.photos/800/600?random=6',
    fallback:
      'https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Service - Interior work',
  },
  {
    filename: 'service-selective.jpg',
    url: 'https://picsum.photos/800/600?random=7',
    fallback:
      'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'Service - Selective demolition',
  },
  {
    filename: 'about-team.jpg',
    url: 'https://picsum.photos/800/600?random=8',
    fallback:
      'https://images.pexels.com/photos/5691639/pexels-photo-5691639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
    description: 'About - Team',
  },
]

const downloadImage = (url, fallbackUrl, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(publicDir, filename)

    // Check if file already exists and is valid
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath)
      if (stats.size > 5000) {
        // If file is larger than 5KB, assume it's valid
        console.log(`  ↻ Already exists: ${filename} (${Math.round(stats.size / 1024)}KB)`)
        resolve(filepath)
        return
      }
    }

    const file = fs.createWriteStream(filepath)

    console.log(`  Downloading: ${filename}...`)

    const downloadFromUrl = (imageUrl, isFallback = false) => {
      https
        .get(imageUrl, { timeout: 30000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
          // Handle redirects
          if (response.statusCode === 301 || response.statusCode === 302) {
            console.log(
              `    → Following redirect to ${response.headers.location.substring(0, 50)}...`,
            )
            downloadFromUrl(response.headers.location, isFallback)
            return
          }

          if (response.statusCode === 200) {
            response.pipe(file)
            file.on('finish', () => {
              file.close()
              const stats = fs.statSync(filepath)
              if (stats.size < 1000) {
                fs.unlink(filepath, () => {})
                if (!isFallback && fallbackUrl) {
                  console.log(`    → Trying fallback URL...`)
                  downloadFromUrl(fallbackUrl, true)
                } else {
                  reject(new Error('Downloaded file is too small'))
                }
              } else {
                console.log(`  ✓ Downloaded: ${filename} (${Math.round(stats.size / 1024)}KB)`)
                resolve(filepath)
              }
            })
          } else {
            file.close()
            fs.unlink(filepath, () => {})
            if (!isFallback && fallbackUrl) {
              console.log(`    → Trying fallback URL...`)
              downloadFromUrl(fallbackUrl, true)
            } else {
              reject(new Error(`Status Code: ${response.statusCode}`))
            }
          }
        })
        .on('error', (err) => {
          file.close()
          fs.unlink(filepath, () => {})
          if (!isFallback && fallbackUrl) {
            console.log(`    → Trying fallback URL...`)
            downloadFromUrl(fallbackUrl, true)
          } else {
            reject(err)
          }
        })
    }

    downloadFromUrl(url)

    file.on('error', (err) => {
      file.close()
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

async function downloadAllImages() {
  console.log('📸 Downloading demolition images...\n')

  let successCount = 0
  let failCount = 0
  const failedImages = []

  for (const img of images) {
    try {
      await downloadImage(img.url, img.fallback, img.filename)
      successCount++
    } catch (error) {
      console.error(`  ✗ Failed: ${img.filename} - ${error.message}`)
      failCount++
      failedImages.push(img.filename)
    }
  }

  console.log('\n📊 Download Summary:')
  console.log(`  ✓ Successful: ${successCount}/${images.length}`)
  console.log(`  ✗ Failed: ${failCount}/${images.length}`)

  if (failCount > 0) {
    console.log(`\n⚠️  Failed images: ${failedImages.join(', ')}`)
    console.log('\n💡 To fix this:')
    console.log('   1. Manually download images from pexels.com or unsplash.com')
    console.log('   2. Save them to /public folder with these names:')
    images.forEach((img) => console.log(`      - ${img.filename}`))
    console.log('   3. Run: pnpm seed:all to upload to CMS')
  }

  console.log('\n✅ Done! Check /public folder for downloaded images.')
}

downloadAllImages().catch(console.error)
