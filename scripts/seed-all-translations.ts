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

// Helper function to upload images
async function uploadImage(payload: any, filename: string, alt: string) {
  const mediaDir = path.join(__dirname, '..', 'public', 'media')
  const filePath = path.join(mediaDir, filename)

  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  Image not found: ${filename}`)
    return null
  }

  // Check if image already exists
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`  ↻ Image already exists: ${filename}`)
    return existing.docs[0]
  }

  try {
    const fileBuffer = fs.readFileSync(filePath)
    const file = {
      name: filename,
      data: fileBuffer,
      mimetype: `image/${filename.split('.').pop()}`,
      size: fileBuffer.length,
    }

    const media = await payload.create({
      collection: 'media',
      data: {
        alt,
        filename: filename,
      },
      file,
    })
    console.log(`  ✓ Uploaded: ${filename}`)
    return media
  } catch (error) {
    console.log(`  ⚠️  Failed to upload ${filename}:`, error)
    return null
  }
}

async function seedAllTranslations() {
  console.log('🌱 Seeding ALL content with translations...')

  const payload = await getPayload({ config })

  try {
    // ==========================================
    // 0. UPLOAD IMAGES FIRST
    // ==========================================
    console.log('\n📸 Uploading images...')

    const heroImage = await uploadImage(
      payload,
      'hero-demolition.webp',
      'Hand demolition work with hammer and tools',
    )
    // Project images
    const project1Image = await uploadImage(
      payload,
      'project-1.webp',
      'Kitchen demolition project - Amsterdam',
    )
    const project2Image = await uploadImage(
      payload,
      'project-2.webp',
      'Bathroom demolition with hand tools - Utrecht',
    )
    const project3Image = await uploadImage(
      payload,
      'project-3.webp',
      'Office strip-out - Rotterdam',
    )
    // Note: project-4.webp, project-5.webp, and project-6.webp don't exist in the folder
    // We'll use existing images for these
    const project4Image = await uploadImage(
      payload,
      'project-1.webp',
      'Property clearing - Eindhoven',
    )
    const project5Image = await uploadImage(
      payload,
      'project-2.webp',
      'Apartment renovation - The Hague',
    )
    const project6Image = await uploadImage(payload, 'project-3.webp', 'Retail space stripping')
    // Service images
    const serviceManualImage = await uploadImage(
      payload,
      'service-manual.webp',
      'Manual demolition with hammer',
    )
    const serviceInteriorImage = await uploadImage(
      payload,
      'interior-demolishion.webp',
      'Interior strip-out work',
    )
    const serviceSelectiveImage = await uploadImage(
      payload,
      'service-selective.webp',
      'Selective demolition preserving structure',
    )
    // Note: service-asbestos.webp doesn't exist, skip it
    const serviceAsbestosImage = null
    // Note: service-kitchen-bathroom.webp exists
    const serviceKitchenBathroomImage = await uploadImage(
      payload,
      'service-kitchen-bathroom.webp',
      'Kitchen and bathroom demolition',
    )
    // Note: service-property-clearing.webp doesn't exist, use interior image instead
    const servicePropertyClearingImage = await uploadImage(
      payload,
      'interior-demolishion.webp',
      'Property clearing',
    )
    // About image
    const aboutTeamImage = await uploadImage(
      payload,
      'about-team.webp',
      'TitanBreakers professional team',
    )

    console.log('✅ Images uploaded')
    // ==========================================
    // 1. SERVICES - Dutch (default) + English
    // ==========================================
    console.log('\n🔄 Seeding Services with translations...')

    const servicesData = [
      {
        nl: {
          title: 'Handmatige Sloop',
          description:
            'Vakkundige sloopwerkzaamheden met hamers en handgereedschap. Perfect voor binnensloop waar machines niet kunnen komen. Wij werken precies en netjes in bestaande panden.',
        },
        en: {
          title: 'Manual Demolition',
          description:
            'Skilled demolition work with hammers and hand tools. Perfect for indoor demolition where machinery cannot access. We work precisely and cleanly in existing buildings.',
        },
        icon: 'Hammer',
        featured: true,
        image: serviceManualImage,
      },
      {
        nl: {
          title: 'Interieur Sloop',
          description:
            'Strip-out van woonhuizen, kantoren en winkels. Van complete keukens tot badkamers - wij slopen binnenmuren en vloeren met precisie en zorg voor het bestaande pand.',
        },
        en: {
          title: 'Interior Demolition',
          description:
            'Strip-out of homes, offices, and retail spaces. From complete kitchens to bathrooms - we demolish interior walls and floors with precision and care for the existing structure.',
        },
        icon: 'Home',
        featured: true,
        image: serviceInteriorImage,
      },
      {
        nl: {
          title: 'Selectieve Sloop',
          description:
            'Gecertificeerde selectieve sloop van specifieke delen van een pand. Wij slopen alleen wat nodig is en behouden de rest, veilig en efficiënt met handgereedschap.',
        },
        en: {
          title: 'Selective Demolition',
          description:
            'Certified selective demolition of specific parts of a building. We only demolish what is necessary and preserve the rest, safely and efficiently with hand tools.',
        },
        icon: 'Target',
        featured: true,
        image: serviceSelectiveImage,
      },
      {
        nl: {
          title: 'Asbest Sanering',
          description:
            'Gecertificeerde verwijdering van asbesthoudende materialen volgens SC-530. Veilig voor mens en milieu, conform alle wettelijke eisen.',
        },
        en: {
          title: 'Asbestos Removal',
          description:
            'Certified removal of asbestos-containing materials according to SC-530 standards. Safe for people and environment, fully compliant with all legal requirements.',
        },
        icon: 'Shield',
        featured: true,
      },
      {
        nl: {
          title: 'Keuken & Badkamer Sloop',
          description:
            'Specialistische sloop van keukens, badkamers en sanitaire ruimtes. Wij verwijderen tegels, leidingen en installaties handmatig en netjes zonder schade aan bestaande constructies.',
        },
        en: {
          title: 'Kitchen & Bathroom Demolition',
          description:
            'Specialized demolition of kitchens, bathrooms, and sanitary spaces. We remove tiles, pipes, and installations manually and neatly without damaging existing structures.',
        },
        icon: 'Droplet',
        featured: false,
      },
      {
        nl: {
          title: 'Woning Ontruiming',
          description:
            'Complete ontruiming en sloop van woningen, appartementen en bedrijfspanden. Wij halen alles eruit wat moet eruit, van vloeren tot plafonds, met zorg voor het pand.',
        },
        en: {
          title: 'Property Clearing',
          description:
            'Complete clearing and demolition of homes, apartments, and commercial properties. We remove everything that needs to go, from floors to ceilings, with care for the building.',
        },
        icon: 'Layers',
        featured: false,
      },
    ]

    for (const service of servicesData) {
      // Create with Dutch content (default locale)
      const serviceData: any = {
        title: service.nl.title,
        description: service.nl.description,
        icon: service.icon,
        featured: service.featured,
      }

      // Add image if available
      if (service.image) {
        serviceData.image = service.image.id
      }

      const created = await payload.create({
        collection: 'services',
        data: serviceData,
      })

      // Add English translation
      await payload.update({
        collection: 'services',
        id: created.id,
        locale: 'en',
        data: {
          title: service.en.title,
          description: service.en.description,
        },
      })

      console.log(`  ✓ Created: ${service.nl.title} / ${service.en.title}`)
    }

    // ==========================================
    // 2. PROJECTS - Dutch (default) + English
    // ==========================================
    console.log('\n🔄 Seeding Projects with translations...')

    const projectsData = [
      {
        nl: {
          title: 'Keukenrenovatie Amsterdam',
          description:
            'Complete strip-out van keuken inclusief tegelvloer, wandtegels, kasten en leidingwerk. Handmatig werk om bestaande constructie te sparen.',
          category: 'renovation' as const,
        },
        en: {
          title: 'Kitchen Renovation Amsterdam',
          description:
            'Complete strip-out of kitchen including tile floor, wall tiles, cabinets, and plumbing. Manual work to preserve existing structure.',
          category: 'renovation' as const,
        },
        featured: true,
        completed: '2024-06-15',
        image: project1Image,
      },
      {
        nl: {
          title: 'Badkamer Sloop Utrecht',
          description:
            'Vakkundige sloop van badkamer met verwijdering van sanitair, tegels en leidingen. Alles met de hand en hamer uitgevoerd.',
          category: 'renovation' as const,
        },
        en: {
          title: 'Bathroom Demolition Utrecht',
          description:
            'Skilled demolition of bathroom with removal of sanitary ware, tiles, and pipes. All done by hand and hammer.',
          category: 'renovation' as const,
        },
        featured: true,
        completed: '2024-03-20',
        image: project2Image,
      },
      {
        nl: {
          title: 'Kantoor Strip-out Rotterdam',
          description:
            'Selectieve sloop van kantoorvloer met behoud van dragende wanden. Vloerbedekking en systeemvloer met de hand verwijderd.',
          category: 'renovation' as const,
        },
        en: {
          title: 'Office Strip-out Rotterdam',
          description:
            'Selective demolition of office floor preserving load-bearing walls. Carpet and system floor removed by hand.',
          category: 'renovation' as const,
        },
        featured: true,
        completed: '2023-11-10',
        image: project3Image,
      },
      {
        nl: {
          title: 'Woning Ontruiming Eindhoven',
          description:
            'Complete ontruiming en sloop van jaren-70 woning. Vloeren, wanden en plafonds met hamers en beitels verwijderd.',
          category: 'demolition' as const,
        },
        en: {
          title: 'Property Clearing Eindhoven',
          description:
            'Complete clearing and demolition of 1970s house. Floors, walls, and ceilings removed with hammers and chisels.',
          category: 'demolition' as const,
        },
        featured: true,
        completed: '2023-09-05',
        image: project1Image,
      },
      {
        nl: {
          title: 'Appartement Renovatie Den Haag',
          description:
            'Interieur sloop van appartement in bestaande flat. Wanden slopen met precisie om buren niet te hinderen.',
          category: 'renovation' as const,
        },
        en: {
          title: 'Apartment Renovation The Hague',
          description:
            'Interior demolition of apartment in existing building. Walls demolished with precision to not disturb neighbors.',
          category: 'renovation' as const,
        },
        featured: true,
        completed: '2023-07-22',
      },
      {
        nl: {
          title: 'Winkelruimte Stripping',
          description:
            'Vloer en wanden van winkelruimte verwijderd voor nieuwe horeca bestemming. Met handgereedschap gewerkt in centrumlocatie.',
          category: 'renovation' as const,
        },
        en: {
          title: 'Retail Space Stripping',
          description:
            'Floor and walls of retail space removed for new hospitality destination. Worked with hand tools in city center location.',
          category: 'renovation' as const,
        },
        featured: true,
        completed: '2022-12-15',
      },
    ]

    for (const project of projectsData) {
      // Create with Dutch content (default locale)
      const projectData: any = {
        title: project.nl.title,
        description: project.nl.description,
        category: project.nl.category,
        featured: project.featured,
        completed: project.completed,
      }

      // Add image if available
      if (project.image) {
        projectData.image = project.image.id
      }

      const created = await payload.create({
        collection: 'projects',
        data: projectData,
      })

      // Add English translation
      await payload.update({
        collection: 'projects',
        id: created.id,
        locale: 'en',
        data: {
          title: project.en.title,
          description: project.en.description,
        },
      })

      console.log(`  ✓ Created: ${project.nl.title} / ${project.en.title}`)
    }

    // ==========================================
    // 3. HOME PAGE GLOBAL - Dutch + English
    // ==========================================
    console.log('\n🔄 Seeding Home Page Global with translations...')

    const homePageGlobal = await payload.findGlobal({ slug: 'home-page' })
    if (homePageGlobal) {
      // Prepare hero data with optional background image
      const heroDataNl: any = {
        title: 'HANDMATIG',
        subtitle: 'SLOOPWERK',
        description:
          'TitanBrekers is uw specialist in vakkundige sloopwerkzaamheden met hamer en handgereedschap. Perfect voor binnensloop waar precisie en zorg voor het pand voorop staan.',
        ctaButtons: [
          { text: 'Gratis Offerte', style: 'primary' },
          { text: 'Bekijk Projecten', style: 'secondary' },
        ],
        stats: [
          { number: '25+', label: 'Jaar Ervaring' },
          { number: '1000+', label: 'Woningen' },
          { number: '100%', label: 'Handwerk' },
        ],
        features: [
          { icon: 'Clock', title: 'Snelle Respons', description: 'Binnen 24 uur reactie' },
          {
            icon: 'Shield',
            title: 'Volledig Verzekerd',
            description: 'Tot €2 miljoen dekking',
          },
          {
            icon: 'Hammer',
            title: 'Vakmanschap',
            description: 'Werken met precisie',
          },
        ],
      }

      // Add hero background image if available
      if (heroImage) {
        heroDataNl.backgroundImage = heroImage.id
      }

      // Dutch content (default)
      await payload.updateGlobal({
        slug: 'home-page',
        locale: 'nl',
        data: {
          hero: heroDataNl,
          aboutPreview: {
            title: 'OVER TITANBREKERS',
            description:
              'Al meer dan 25 jaar is TitanBrekers dé specialist in handmatige sloopwerkzaamheden voor woningen en bedrijfspanden. Wij slopen keukens, badkamers en interieurs met hamer en beitel, altijd met respect voor het bestaande pand.',
            highlights: [
              { text: 'VCA** gecertificeerd en volledig verzekerd' },
              { text: 'Specialist in handmatig sloopwerk' },
              { text: '98% van afval gescheiden en gerecycled' },
              { text: 'Werken in bestaande panden zonder overlast' },
            ],
          },
        },
      })
      console.log('  ✓ Updated Home Page Global (Dutch)')

      // Prepare hero data for English with optional background image
      const heroDataEn: any = {
        title: 'MANUAL',
        subtitle: 'DEMOLITION',
        description:
          'TitanBrekers is your specialist in skilled demolition work with hammer and hand tools. Perfect for indoor demolition where precision and care for the building come first.',
        ctaButtons: [
          { text: 'Free Quote', style: 'primary' },
          { text: 'View Projects', style: 'secondary' },
        ],
        stats: [
          { number: '25+', label: 'Years Experience' },
          { number: '1000+', label: 'Homes' },
          { number: '100%', label: 'Handwork' },
        ],
        features: [
          { icon: 'Clock', title: 'Fast Response', description: 'Response within 24 hours' },
          { icon: 'Shield', title: 'Fully Insured', description: 'Up to €2 million coverage' },
          { icon: 'Hammer', title: 'Craftsmanship', description: 'Working with precision' },
        ],
      }

      // Add hero background image if available
      if (heroImage) {
        heroDataEn.backgroundImage = heroImage.id
      }

      // English content
      await payload.updateGlobal({
        slug: 'home-page',
        locale: 'en',
        data: {
          hero: heroDataEn,
          aboutPreview: {
            title: 'ABOUT TITANBREKERS',
            description:
              'For more than 25 years, TitanBrekers has been the specialist in manual demolition work for homes and commercial properties. We demolish kitchens, bathrooms, and interiors with hammer and chisel, always with respect for the existing building.',
            highlights: [
              { text: 'VCA** certified and fully insured' },
              { text: 'Specialist in manual demolition work' },
              { text: '98% of waste separated and recycled' },
              { text: 'Working in existing buildings without nuisance' },
            ],
          },
        },
      })
      console.log('  ✓ Updated Home Page Global (English)')
    }

    // ==========================================
    // 4. SERVICES PAGE GLOBAL - Dutch + English
    // ==========================================
    console.log('\n🔄 Seeding Services Page Global with translations...')

    const servicesPageGlobal = await payload.findGlobal({ slug: 'services-page' })
    if (servicesPageGlobal) {
      // Dutch content (default)
      await payload.updateGlobal({
        slug: 'services-page',
        locale: 'nl',
        data: {
          hero: {
            title: 'ONZE SPECIALISATIES',
            description:
              'Van keukenstripping tot complete woningontruiming - wij voeren alle sloopwerkzaamheden handmatig uit met hamer en beitel. Perfect voor renovaties waar machines niet kunnen komen.',
          },
        },
      })
      console.log('  ✓ Updated Services Page Global (Dutch)')

      // English content
      await payload.updateGlobal({
        slug: 'services-page',
        locale: 'en',
        data: {
          hero: {
            title: 'OUR SPECIALTIES',
            description:
              'From kitchen stripping to complete property clearing - we carry out all demolition work manually with hammer and chisel. Perfect for renovations where machinery cannot access.',
          },
        },
      })
      console.log('  ✓ Updated Services Page Global (English)')
    }

    // ==========================================
    // 5. ABOUT PAGE GLOBAL - Dutch + English
    // ==========================================
    console.log('\n🔄 Seeding About Page Global with translations...')

    const aboutPageGlobal = await payload.findGlobal({ slug: 'about-page' })
    if (aboutPageGlobal) {
      // Dutch content (default)
      const aboutHeroDataNl: any = {
        title: 'WIE ZIJN WIJ',
        description:
          'Al meer dan 25 jaar is TitanBrekers dé specialist in handmatig sloopwerk voor woningen en bedrijfspanden. Met hamer en beitel, passie en vakmanschap maken wij ruimte voor uw renovatie.',
      }

      // Add hero background image if available
      if (aboutTeamImage) {
        aboutHeroDataNl.backgroundImage = aboutTeamImage.id
      }

      await payload.updateGlobal({
        slug: 'about-page',
        locale: 'nl',
        data: {
          hero: aboutHeroDataNl,
          story: {
            title: 'ONS VERHAAL',
            paragraphs: [
              {
                text: 'TitanBrekers is in 1998 opgericht als klein familiebedrijf in Rotterdam. Wat begon als een klusjesman met een hamer is uitgegroeid tot een toonaangevend sloopbedrijf gespecialiseerd in handmatig binnensloopwerk.',
              },
              {
                text: 'Onze kracht zit in ons team van ervaren slopers die allemaal meester zijn in het werken met hamer, beitel en andere handgereedschap. Wij slopen keukens, badkamers en interieur precies zoals de klant het wil, zonder machines die schade aanrichten.',
              },
            ],
          },
          stats: [
            { number: '25+', label: 'Jaar Ervaring' },
            { number: '1000+', label: 'Woningen' },
            { number: '15', label: 'Vakmensen' },
            { number: '98%', label: 'Recycling' },
          ],
          values: [
            {
              icon: 'Shield',
              title: 'Veiligheid',
              description:
                'Veiligheid staat voorop. Wij werken netjes en veilig in uw bestaande pand zonder buren te hinderen.',
            },
            {
              icon: 'Target',
              title: 'Precisie',
              description:
                'Met de hand slopen wij alleen wat nodig is. Bestaande constructies en leidingen sparen wij altijd.',
            },
            {
              icon: 'Heart',
              title: 'Netjes Werken',
              description:
                'Wij leveren altijd netjes op, zonder schade aan wat moet blijven staan. Uw huis is veilig in onze handen.',
            },
            {
              icon: 'Users',
              title: 'Vakmanschap',
              description:
                'Onze slopers hebben jarenlange ervaring in handmatig sloopwerk. Wij weten precies hoe we moeten slopen zonder machines.',
            },
          ],
          timeline: [
            {
              year: '1998',
              title: 'Oprichting',
              description: 'TitanBrekers start als klusbedrijf in Rotterdam',
            },
            {
              year: '2005',
              title: 'Specialisatie',
              description: 'Focus op handmatig sloopwerk voor renovaties',
            },
            {
              year: '2015',
              title: 'Groeit',
              description: 'Team uitgebreid naar 15 vakmensen',
            },
            {
              year: '2024',
              title: 'Mijlpaal',
              description: '1000+ woningen gesloopt voor renovatie',
            },
          ],
        },
      })
      console.log('  ✓ Updated About Page Global (Dutch)')

      // English content
      const aboutHeroDataEn: any = {
        title: 'WHO WE ARE',
        description:
          'For more than 25 years, TitanBrekers has been the specialist in manual demolition work for homes and commercial properties. With hammer and chisel, passion and craftsmanship, we make room for your renovation.',
      }

      // Add hero background image if available
      if (aboutTeamImage) {
        aboutHeroDataEn.backgroundImage = aboutTeamImage.id
      }

      await payload.updateGlobal({
        slug: 'about-page',
        locale: 'en',
        data: {
          hero: aboutHeroDataEn,
          story: {
            title: 'OUR STORY',
            paragraphs: [
              {
                text: 'TitanBrekers was founded in 1998 as a small family business in Rotterdam. What started as a handyman with a hammer has grown into a leading demolition company specialized in manual indoor demolition work.',
              },
              {
                text: 'Our strength lies in our team of experienced demolition workers who are all masters at working with hammer, chisel, and other hand tools. We demolish kitchens, bathrooms, and interiors exactly as the customer wants, without machines that cause damage.',
              },
            ],
          },
          stats: [
            { number: '25+', label: 'Years Experience' },
            { number: '1000+', label: 'Homes' },
            { number: '15', label: 'Craftsmen' },
            { number: '98%', label: 'Recycling' },
          ],
          values: [
            {
              icon: 'Shield',
              title: 'Safety',
              description:
                'Safety comes first. We work neatly and safely in your existing building without disturbing neighbors.',
            },
            {
              icon: 'Target',
              title: 'Precision',
              description:
                'By hand we demolish only what is necessary. We always spare existing structures and pipes.',
            },
            {
              icon: 'Heart',
              title: 'Clean Work',
              description:
                'We always deliver cleanly, without damage to what should remain standing. Your home is safe in our hands.',
            },
            {
              icon: 'Users',
              title: 'Craftsmanship',
              description:
                'Our demolition workers have years of experience in manual demolition work. We know exactly how to demolish without machines.',
            },
          ],
          timeline: [
            {
              year: '1998',
              title: 'Foundation',
              description: 'TitanBrekers starts as a handyman business in Rotterdam',
            },
            {
              year: '2005',
              title: 'Specialization',
              description: 'Focus on manual demolition work for renovations',
            },
            {
              year: '2015',
              title: 'Grew',
              description: 'Team expanded to 15 craftsmen',
            },
            {
              year: '2024',
              title: 'Milestone',
              description: '1000+ homes demolished for renovation',
            },
          ],
        },
      })
      console.log('  ✓ Updated About Page Global (English)')
    }

    // ==========================================
    // 6. CONTACT PAGE GLOBAL - Dutch + English
    // ==========================================
    console.log('\n🔄 Seeding Contact Page Global with translations...')

    const contactPageGlobal = await payload.findGlobal({ slug: 'contact-page' })
    if (contactPageGlobal) {
      // Dutch content (default)
      await payload.updateGlobal({
        slug: 'contact-page',
        locale: 'nl',
        data: {
          hero: {
            title: 'NEEM CONTACT OP',
            description:
              'Heeft u een keuken, badkamer of interieur dat gesloopt moet worden? Neem vrijblijvend contact met ons op voor een offerte. Wij reageren binnen 24 uur en slopen met precisie en zorg.',
          },
          formSettings: {
            title: 'STUUR EEN BERICHT',
            subjects: [
              { value: 'keuken', label: 'Keuken sloop' },
              { value: 'badkamer', label: 'Badkamer sloop' },
              { value: 'interieur', label: 'Interieur sloop' },
              { value: 'woning', label: 'Woning ontruiming' },
              { value: 'anders', label: 'Anders' },
            ],
          },
        },
      })
      console.log('  ✓ Updated Contact Page Global (Dutch)')

      // English content
      await payload.updateGlobal({
        slug: 'contact-page',
        locale: 'en',
        data: {
          hero: {
            title: 'GET IN TOUCH',
            description:
              'Do you have a kitchen, bathroom, or interior that needs to be demolished? Feel free to contact us for a quote. We respond within 24 hours and demolish with precision and care.',
          },
          formSettings: {
            title: 'SEND A MESSAGE',
            subjects: [
              { value: 'keuken', label: 'Kitchen demolition' },
              { value: 'badkamer', label: 'Bathroom demolition' },
              { value: 'interieur', label: 'Interior demolition' },
              { value: 'woning', label: 'Property clearing' },
              { value: 'anders', label: 'Other' },
            ],
          },
        },
      })
      console.log('  ✓ Updated Contact Page Global (English)')
    }

    // ==========================================
    // 7. SITE SETTINGS - Dutch + English
    // ==========================================
    console.log('\n🔄 Seeding Site Settings with translations...')

    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    if (siteSettings) {
      // Dutch content (default)
      await payload.updateGlobal({
        slug: 'site-settings',
        locale: 'nl',
        data: {
          companyName: 'TitanBrekers',
          tagline: 'Handmatig Sloopwerk met Hamer en Beitel',
          contact: {
            phone: '06-12345678',
            email: 'info@titanbrekers.nl',
            address: 'Industrieweg 45, 1234 AB Rotterdam',
          },
        },
      })
      console.log('  ✓ Updated Site Settings (Dutch)')

      // English content
      await payload.updateGlobal({
        slug: 'site-settings',
        locale: 'en',
        data: {
          companyName: 'TitanBrekers',
          tagline: 'Manual Demolition Work with Hammer and Chisel',
          contact: {
            phone: '06-12345678',
            email: 'info@titanbrekers.nl',
            address: 'Industrieweg 45, 1234 AB Rotterdam',
          },
        },
      })
      console.log('  ✓ Updated Site Settings (English)')
    }

    console.log('\n🎉 ALL content with translations seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding translations:', error)
    process.exit(1)
  }
}

seedAllTranslations()
