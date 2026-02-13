import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import fs from 'fs'
import path from 'path'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { services as servicesData } from './services'
import { projects as projectsData } from './projects'
import { projectImage1 } from './image-project-1'
import { projectImage2 } from './image-project-2'
import { projectImage3 } from './image-project-3'
import { projectImage4 } from './image-project-4'
import { projectImage5 } from './image-project-5'
import { projectImage6 } from './image-project-6'
import { blogImageManualDemo } from './image-blog-manual-demo'
import { blogImageAsbestosSafety } from './image-blog-asbestos-safety'
import { blogImageKitchenPrep } from './image-blog-kitchen-prep'
import { blogImageBathroomTips } from './image-blog-bathroom-tips'
import { blogImageAnniversary } from './image-blog-anniversary'
import { blogImageSustainable } from './image-blog-sustainable'
import { serviceImageAsbestos } from './image-service-asbestos'
import { serviceImagePropertyClearing } from './image-service-property-clearing'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'services',
  'projects',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

const ORIGINAL_MEDIA_FILES = [
  'project-1.webp',
  'project-2.webp',
  'project-3.webp',
  'project-4.webp',
  'project-5.webp',
  'project-6.webp',
  'hero-demolition.webp',
  'about-team.webp',
  'blog-manual-demo.webp',
  'blog-asbestos-safety.webp',
  'blog-kitchen-prep.webp',
  'blog-bathroom-tips.webp',
  'blog-anniversary.webp',
  'blog-sustainable.webp',
  'service-asbestos.webp',
  'service-property-clearing.webp',
  'service-manual.webp',
  'service-selective.webp',
  'service-kitchen-bathroom.webp',
  'interior-demolishion.webp',
]

function clearMediaDuplicates(mediaDir: string): void {
  if (!fs.existsSync(mediaDir)) return

  const files = fs.readdirSync(mediaDir)
  for (const file of files) {
    if (!ORIGINAL_MEDIA_FILES.includes(file)) {
      const filePath = path.join(mediaDir, file)
      fs.unlinkSync(filePath)
      console.log(`  ✓ Removed duplicate: ${file}`)
    }
  }
}

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  const mediaDir = path.join(process.cwd(), 'public', 'media')
  payload.logger.info(`— Clearing duplicate media files...`)
  clearMediaDuplicates(mediaDir)

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [
    image1Buffer,
    image2Buffer,
    image3Buffer,
    image4Buffer,
    image5Buffer,
    image6Buffer,
    hero1Buffer,
    blogManualDemoBuffer,
    blogAsbestosSafetyBuffer,
    blogKitchenPrepBuffer,
    blogBathroomTipsBuffer,
    blogAnniversaryBuffer,
    blogSustainableBuffer,
    serviceAsbestosBuffer,
    servicePropertyClearingBuffer,
  ] = await Promise.all([
    fetchFileFromMedia(mediaDir, 'project-1.webp'),
    fetchFileFromMedia(mediaDir, 'project-2.webp'),
    fetchFileFromMedia(mediaDir, 'project-3.webp'),
    fetchFileFromMedia(mediaDir, 'project-4.webp'),
    fetchFileFromMedia(mediaDir, 'project-5.webp'),
    fetchFileFromMedia(mediaDir, 'project-6.webp'),
    fetchFileFromMedia(mediaDir, 'hero-demolition.webp'),
    fetchFileFromMedia(mediaDir, 'blog-manual-demo.webp'),
    fetchFileFromMedia(mediaDir, 'blog-asbestos-safety.webp'),
    fetchFileFromMedia(mediaDir, 'blog-kitchen-prep.webp'),
    fetchFileFromMedia(mediaDir, 'blog-bathroom-tips.webp'),
    fetchFileFromMedia(mediaDir, 'blog-anniversary.webp'),
    fetchFileFromMedia(mediaDir, 'blog-sustainable.webp'),
    fetchFileFromMedia(mediaDir, 'service-asbestos.webp'),
    fetchFileFromMedia(mediaDir, 'service-property-clearing.webp'),
  ])

  const [
    demoAuthor,
    image1Doc,
    image2Doc,
    image3Doc,
    image4Doc,
    image5Doc,
    image6Doc,
    imageHomeDoc,
    blogManualDemoDoc,
    blogAsbestosSafetyDoc,
    blogKitchenPrepDoc,
    blogBathroomTipsDoc,
    blogAnniversaryDoc,
    blogSustainableDoc,
    serviceAsbestosDoc,
    servicePropertyClearingDoc,
  ] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: projectImage1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: projectImage2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: projectImage3,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: projectImage4,
      file: image4Buffer,
    }),
    payload.create({
      collection: 'media',
      data: projectImage5,
      file: image5Buffer,
    }),
    payload.create({
      collection: 'media',
      data: projectImage6,
      file: image6Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: blogImageManualDemo,
      file: blogManualDemoBuffer,
    }),
    payload.create({
      collection: 'media',
      data: blogImageAsbestosSafety,
      file: blogAsbestosSafetyBuffer,
    }),
    payload.create({
      collection: 'media',
      data: blogImageKitchenPrep,
      file: blogKitchenPrepBuffer,
    }),
    payload.create({
      collection: 'media',
      data: blogImageBathroomTips,
      file: blogBathroomTipsBuffer,
    }),
    payload.create({
      collection: 'media',
      data: blogImageAnniversary,
      file: blogAnniversaryBuffer,
    }),
    payload.create({
      collection: 'media',
      data: blogImageSustainable,
      file: blogSustainableBuffer,
    }),
    payload.create({
      collection: 'media',
      data: serviceImageAsbestos,
      file: serviceAsbestosBuffer,
    }),
    payload.create({
      collection: 'media',
      data: serviceImagePropertyClearing,
      file: servicePropertyClearingBuffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding services...`)

  const servicesWithImages = [
    { ...servicesData[0], image: undefined },
    { ...servicesData[1], image: undefined },
    { ...servicesData[2], image: serviceAsbestosDoc.id },
    { ...servicesData[3], image: undefined },
    { ...servicesData[4], image: servicePropertyClearingDoc.id },
    { ...servicesData[5], image: undefined },
  ]

  await Promise.all(
    servicesWithImages.map((service) =>
      payload.create({
        collection: 'services',
        data: service,
      }),
    ),
  )

  payload.logger.info(`— Seeding projects...`)

  const projectsWithImages = [
    { ...projectsData[0], image: image1Doc.id },
    { ...projectsData[1], image: image2Doc.id },
    { ...projectsData[2], image: image3Doc.id },
    { ...projectsData[3], image: image4Doc.id },
    { ...projectsData[4], image: image5Doc.id },
    { ...projectsData[5], image: image6Doc.id },
  ]

  for (const project of projectsWithImages) {
    await payload.create({
      collection: 'projects',
      data: project,
    })
  }

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileFromMedia(mediaDir: string, filename: string): Promise<File> {
  const filePath = path.join(mediaDir, filename)

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }

  const data = fs.readFileSync(filePath)
  const stat = fs.statSync(filePath)

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: 'image/webp',
    size: stat.size,
  }
}
