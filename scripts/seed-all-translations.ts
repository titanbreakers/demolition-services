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
  const mediaDir = path.join(process.cwd(), 'public', 'media')
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
      'Professional demolition work',
    )
    // Project images
    const project1Image = await uploadImage(
      payload,
      'project-1.webp',
      'Kitchen Renovation Amsterdam',
    )
    const project2Image = await uploadImage(
      payload,
      'project-2.webp',
      'Bathroom Demolition Utrecht',
    )
    const project3Image = await uploadImage(payload, 'project-3.webp', 'Office Strip-out Rotterdam')
    const project4Image = await uploadImage(
      payload,
      'project-4.webp',
      'Property Clearing Eindhoven',
    )
    const project5Image = await uploadImage(
      payload,
      'project-5.webp',
      'Apartment Renovation The Hague',
    )
    const project6Image = await uploadImage(payload, 'project-6.webp', 'Retail Space Stripping')
    // Service images
    const serviceManualImage = await uploadImage(
      payload,
      'service-manual.webp',
      'Manual Demolition',
    )
    const serviceInteriorImage = await uploadImage(
      payload,
      'interior-demolishion.webp',
      'Interior Strip-out',
    )
    const serviceSelectiveImage = await uploadImage(
      payload,
      'service-selective.webp',
      'Selective Demolition',
    )
    const serviceAsbestosImage = await uploadImage(
      payload,
      'service-asbestos.webp',
      'Asbestos Removal',
    )
    const serviceKitchenBathroomImage = await uploadImage(
      payload,
      'service-kitchen-bathroom.webp',
      'Kitchen and Bathroom Demolition',
    )
    const servicePropertyClearingImage = await uploadImage(
      payload,
      'service-property-clearing.webp',
      'Property Clearing',
    )
    // Blog images
    const blogManualDemoImage = await uploadImage(
      payload,
      'blog-manual-demo.webp',
      'Manual Demolition Benefits',
    )
    const blogAsbestosSafetyImage = await uploadImage(
      payload,
      'blog-asbestos-safety.webp',
      'Asbestos Safety',
    )
    const blogKitchenPrepImage = await uploadImage(
      payload,
      'blog-kitchen-prep.webp',
      'Kitchen Renovation Prep',
    )
    const blogBathroomTipsImage = await uploadImage(
      payload,
      'blog-bathroom-tips.webp',
      'Bathroom Demo Tips',
    )
    const blogAnniversaryImage = await uploadImage(
      payload,
      'blog-anniversary.webp',
      '25 Year Anniversary',
    )
    const blogSustainableImage = await uploadImage(
      payload,
      'blog-sustainable.webp',
      'Sustainable Demolition',
    )
    // About image
    const aboutTeamImage = await uploadImage(
      payload,
      'about-team.webp',
      'TitanBreakers Professional Team',
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
        image: serviceAsbestosImage,
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
        image: serviceKitchenBathroomImage,
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
        image: servicePropertyClearingImage,
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
        image: project4Image,
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
        image: project5Image,
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
        image: project6Image,
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

    // ==========================================
    // 8. CATEGORIES - Dutch + English
    // ==========================================
    console.log('\n🔄 Seeding Categories with translations...')

    const categoriesData = [
      {
        nl: { title: 'Sloopwerk', slug: 'sloopwerk' },
        en: { title: 'Demolition', slug: 'demolition' },
      },
      {
        nl: { title: 'Renovatie', slug: 'renovatie' },
        en: { title: 'Renovation', slug: 'renovation' },
      },
      {
        nl: { title: 'Tips & Advies', slug: 'tips-advies' },
        en: { title: 'Tips & Advice', slug: 'tips-advice' },
      },
      {
        nl: { title: 'Veiligheid', slug: 'veiligheid' },
        en: { title: 'Safety', slug: 'safety' },
      },
      {
        nl: { title: 'Nieuws', slug: 'nieuws' },
        en: { title: 'News', slug: 'news' },
      },
    ]

    const createdCategories: any[] = []
    for (const category of categoriesData) {
      const created = await payload.create({
        collection: 'categories',
        data: {
          title: category.nl.title,
          slug: category.nl.slug,
        } as any,
      })

      await payload.update({
        collection: 'categories',
        id: created.id,
        locale: 'en',
        data: {
          title: category.en.title,
          slug: category.en.slug,
        } as any,
      })

      createdCategories.push({ ...created, nl: category.nl, en: category.en })
      console.log(`  ✓ Created: ${category.nl.title} / ${category.en.title}`)
    }

    // ==========================================
    // 9. POSTS - Dutch + English
    // ==========================================
    console.log('\n🔄 Seeding Posts with translations...')

    const postsData = [
      {
        nl: {
          title: 'Waarom kiezen voor handmatige sloop?',
          slug: 'handmatige-sloop-voordelen',
          meta: {
            description:
              'Ontdek de voordelen van handmatige sloop ten opzichte van machinale sloop. Precisie, veiligheid en kostenbesparing voor uw renovatieproject.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Wanneer u een renovatieproject start, staat u voor een belangrijke keuze: machinale sloop met zware apparatuur of handmatige sloop met vakmanschap en precisie. Bij TitanBreakers geloven we al meer dan 25 jaar in de kracht van handmatig sloopwerk. In dit uitgebreide artikel delen we waarom hamer en beitel in veel gevallen de betere keuze zijn.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Precisie en controle' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Het grootste voordeel van handmatige sloop is de ongeëvenaarde precisie die het biedt. Waar machines vaak een groot werkgebied hebben en collateral damage kunnen veroorzaken, werkt een ervaren sloper met chirurgische precisie. Dit is vooral belangrijk in situaties waarin:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• U specifieke elementen wilt behouden, zoals originele ornamenten of dragende constructies\n• U werkt in een appartement met gevoelige buren\n• Er historische elementen in het pand aanwezig zijn\n• De ruimte te klein is voor zware machines',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Veiligheid in bestaande bebouwing' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In bestaande panden, met name in appartementen en tussenwoningen, is veiligheid van het grootste belang. Trillingen van zware machines kunnen schade veroorzaken aan naburige woningen. Handmatige sloop genereert minimale trillingen en is daardoor veel veiliger voor:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Monumentale panden met fragiele constructies\n• Woningen met gescheurde muren of oude funderingen\n• Projecten in stedelijke gebieden met smalle woningen\n• Locaties met asbest of andere gevaarlijke materialen',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Kostenbesparing' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Hoewel machinale sloop op het eerste gezicht sneller lijkt, kan handmatige sloop uiteindelijk kostenefficiënter zijn. De voordelen op een rij:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '1. Lagere transportkosten: geen dure machines transporteren\n2. Minder schade aan te behouden elementen: geen verrassende reparatiekosten\n3. Flexibiliteit: werken op tijden dat machines niet mogen\n4. Geen bouwvergunning voor machinaal werk nodig\n5. Minder overlast voor buren: geen claims',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Duurzaamheid' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Handmatige sloop draagt bij aan een duurzame bouwcultuur. Door gericht te slopen kunnen materialen vaak hergebruikt worden. Dakpannen, houten balken, oude vloeren en zelfs bakstenen krijgen een tweede leven. Bij TitanBreakers scheiden we al het afval zorgvuldig en realiseren we een recyclingpercentage van 98%.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Wanneer kiest u voor handmatige sloop?' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Handmatige sloop is de ideale keuze voor:' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Keukenrenovaties waarbij alleen de oude keuken verwijderd wordt\n• Badkamerrenovaties met behoud van tegelwerk in andere ruimtes\n• Interieursloop voor het creëren van een open leefruimte\n• Selectieve sloop waarbij specifieke wanden verwijderd worden\n• Projecten in monumentale panden\n• Kleine ruimtes waar machines niet passen',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Bij TitanBreakers combineren we jarenlange ervaring met moderne technieken om elk project tot een succes te maken. Neem contact met ons op voor een vrijblijvende offerte en ontdek wat handmatige sloop voor uw project kan betekenen.',
                    },
                  ],
                },
              ],
            },
          },
        },
        en: {
          title: 'Why Choose Manual Demolition?',
          slug: 'manual-demolition-benefits',
          meta: {
            description:
              'Discover the benefits of manual demolition over mechanical demolition. Precision, safety, and cost savings for your renovation project.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'When starting a renovation project, you face an important choice: mechanical demolition with heavy equipment or manual demolition with craftsmanship and precision. At TitanBreakers, we have believed in the power of manual demolition work for over 25 years. In this comprehensive article, we share why hammer and chisel are often the better choice.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Precision and Control' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The biggest advantage of manual demolition is the unparalleled precision it offers. Where machines often have a large work area and can cause collateral damage, an experienced demolition worker operates with surgical precision. This is especially important in situations where:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• You want to preserve specific elements, such as original ornaments or load-bearing structures\n• You are working in an apartment with sensitive neighbors\n• There are historical elements present in the building\n• The space is too small for heavy machinery',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Safety in Existing Buildings' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In existing buildings, particularly in apartments and terraced houses, safety is of the utmost importance. Vibrations from heavy machinery can cause damage to neighboring properties. Manual demolition generates minimal vibrations and is therefore much safer for:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Monumental buildings with fragile structures\n• Homes with cracked walls or old foundations\n• Projects in urban areas with narrow buildings\n• Locations with asbestos or other hazardous materials',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Cost Savings' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Although mechanical demolition may seem faster at first glance, manual demolition can ultimately be more cost-effective. The advantages at a glance:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '1. Lower transport costs: no expensive machinery to transport\n2. Less damage to elements to be preserved: no surprising repair costs\n3. Flexibility: working at times when machinery is not allowed\n4. No building permit required for mechanical work\n5. Less nuisance for neighbors: no claims',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Sustainability' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Manual demolition contributes to a sustainable construction culture. By demolishing selectively, materials can often be reused. Roof tiles, wooden beams, old floors, and even bricks get a second life. At TitanBreakers, we carefully separate all waste and achieve a recycling rate of 98%.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'When Do You Choose Manual Demolition?' }],
                },
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Manual demolition is the ideal choice for:' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Kitchen renovations where only the old kitchen is being removed\n• Bathroom renovations with preservation of tile work in other rooms\n• Interior demolition for creating an open living space\n• Selective demolition where specific walls are being removed\n• Projects in monumental buildings\n• Small spaces where machinery does not fit',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'At TitanBreakers, we combine years of experience with modern techniques to make every project a success. Contact us for a free quote and discover what manual demolition can mean for your project.',
                    },
                  ],
                },
              ],
            },
          },
        },
        categoryIndex: 0,
        heroImage: serviceManualImage,
      },
      {
        nl: {
          title: 'Veilig werken met asbest: wat u moet weten',
          slug: 'asbest-veiligheid-werk',
          meta: {
            description:
              'Alles over veilig asbestverwijdering. Wetgeving, certificering, procedures en waarom u altijd een gespecialiseerd bedrijf moet inschakelen.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: "Asbest is een verborgen gevaar in veel gebouwen die voor 1994 zijn gebouwd. Hoewel dit materiaal vroeger werd geprezen om zijn duurzaamheid en isolerende eigenschappen, weten we nu dat blootstelling aan asbestvezels ernstige gezondheidsrisico's met zich meebrengt. Bij TitanBreakers zijn we gecertificeerd voor asbestverwijdering en nemen we dit werk uiterst serieus.",
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Wat is asbest en waar zit het?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Asbest is een natuurlijk mineraal dat vanwege zijn unieke eigenschappen decennialang werd gebruikt in de bouw. Het is hittebestendig, sterk en heeft goede isolerende eigenschappen. In Nederland werd asbest vooral veel toegepast in:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Golfplaten op daken en gevels van schuren en garages\n• Leidingisolatie rond cv-leidingen en centrale verwarming\n• Vloertegels en vinyl vloerbedekking\n• Vuurvaste panelen en plaatmateriaal\n• Plafondplaten in kelder, technische ruimtes en scholen\n• Kachelpijpen en openhaarden',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: "De gezondheidsrisico's" }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Wanneer asbest wordt verstoord, komen er microscopisch kleine vezels vrij die diep in de longen kunnen doordringen. Deze vezels blijven levenslang in het lichaam en kunnen leiden tot:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Asbestose: verlittekening van het longweefsel\n• Longkanker: met name bij rokers is het risico extreem verhoogd\n• Mesothelioom: een zeldzame maar altijd dodelijke vorm van kanker\n• Pleurahypertrofie: verdikking van het longvlies',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Het gevaarlijke aan asbest is dat klachten vaak pas 20-40 jaar na blootstelling ontstaan. Dit maakt preventie extra belangrijk.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Wetgeving en certificering' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Sinds 1993 is asbest verboden in Nederland, maar er is nog steeds veel asbest aanwezig in de bestaande bouw. Asbestverwijdering valt onder strenge regelgeving. Wie asbestwerkzaamheden mag uitvoeren:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Het bedrijf moet gecertificeerd zijn volgens BRL 2003 (Asbestinventarisatie) en BRL 2004 (Asbestverwijdering)\n• Werknemers moeten speciale asbestcursussen hebben gevolgd\n• Er moet gewerkt worden met goedgekeurde beschermingsmiddelen\n• Afval moet worden afgevoerd door gecertificeerde afvalverwerkers\n• Er moet altijd een melding worden gedaan bij de gemeente',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Het verwijderproces' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Professionele asbestverwijdering verloopt volgens een strikt protocol:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '1. Vooronderzoek: een gecertificeerd asbestinventariseerder brengt de locatie en hoeveelheid asbest in kaart\n2. Melding: bij de gemeente wordt een sloopmelding gedaan\n3. Voorbereiding: de werkruimte wordt afgezet met plastic en er wordt een ontsmettingszone ingericht\n4. Verwijdering: gespecialiseerde medewerkers in volledige beschermingspakken verwijderen het asbest volgens vaste procedures\n5. Controle: na verwijdering vindt er een eindinspectie plaats\n6. Afvoer: asbestafval wordt in gesloten containers afgevoerd naar een speciale stortplaats',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Kosten en verzekering' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Asbestverwijdering is kostbaar maar noodzakelijk. De kosten hangen af van:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• De hoeveelheid asbest\n• De bereikbaarheid van de locatie\n• De complexiteit van de verwijdering\n• Benodigde beschermingsmaatregelen',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In sommige gevallen kunt u subsidie aanvragen voor asbestverwijdering. Ook zijn er speciale verzekeringen die dekking bieden voor asbestsanering. Neem contact met ons op voor een vrijblijvende offerte en advies over mogelijke subsidies.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Wilt u meer weten over asbest in uw pand of een offerte aanvragen voor asbestverwijdering? Neem contact op met TitanBreakers. Onze gespecialiseerde medewerkers staan voor u klaar.',
                    },
                  ],
                },
              ],
            },
          },
        },
        en: {
          title: 'Working Safely with Asbestos: What You Need to Know',
          slug: 'asbestos-safety-work',
          meta: {
            description:
              'Everything about safe asbestos removal. Legislation, certification, procedures and why you should always hire a specialized company.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Asbestos is a hidden danger in many buildings constructed before 1994. Although this material was once praised for its durability and insulating properties, we now know that exposure to asbestos fibers poses serious health risks. At TitanBreakers, we are certified for asbestos removal and take this work extremely seriously.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'What is Asbestos and Where is it Found?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Asbestos is a natural mineral that was used in construction for decades because of its unique properties. It is heat-resistant, strong, and has good insulating properties. In the Netherlands, asbestos was particularly widely used in:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Corrugated roofing sheets on roofs and facades of sheds and garages\n• Pipe insulation around central heating pipes\n• Floor tiles and vinyl flooring\n• Fire-resistant panels and sheet material\n• Ceiling panels in basements, technical rooms, and schools\n• Chimney pipes and fireplaces',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The Health Risks' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'When asbestos is disturbed, microscopic fibers are released that can penetrate deep into the lungs. These fibers remain in the body for life and can lead to:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Asbestosis: scarring of lung tissue\n• Lung cancer: especially for smokers, the risk is extremely increased\n• Mesothelioma: a rare but always fatal form of cancer\n• Pleural hypertrophy: thickening of the lung membrane',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The dangerous thing about asbestos is that symptoms often only appear 20-40 years after exposure. This makes prevention especially important.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Legislation and Certification' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Asbestos has been banned in the Netherlands since 1993, but there is still a lot of asbestos present in existing buildings. Asbestos removal is subject to strict regulations. Who may carry out asbestos work:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• The company must be certified according to BRL 2003 (Asbestos Inventory) and BRL 2004 (Asbestos Removal)\n• Employees must have completed special asbestos courses\n• Work must be done with approved protective equipment\n• Waste must be disposed of by certified waste processors\n• There must always be a notification to the municipality',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The Removal Process' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Professional asbestos removal follows a strict protocol:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '1. Preliminary investigation: a certified asbestos inventory expert maps the location and amount of asbestos\n2. Notification: a demolition notification is made to the municipality\n3. Preparation: the work area is cordoned off with plastic and a decontamination zone is set up\n4. Removal: specialized staff in full protective suits remove the asbestos according to fixed procedures\n5. Control: after removal, a final inspection takes place\n6. Disposal: asbestos waste is transported in closed containers to a special landfill',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Costs and Insurance' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Asbestos removal is costly but necessary. The costs depend on:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• The amount of asbestos\n• The accessibility of the location\n• The complexity of the removal\n• Required protective measures',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In some cases, you can apply for a subsidy for asbestos removal. There are also special insurance policies that cover asbestos remediation. Contact us for a free quote and advice on possible subsidies.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Want to know more about asbestos in your building or request a quote for asbestos removal? Contact TitanBreakers. Our specialized staff are ready to help you.',
                    },
                  ],
                },
              ],
            },
          },
        },
        categoryIndex: 3,
        heroImage: serviceInteriorImage,
      },
      {
        nl: {
          title: 'De ultieme checklist voor uw keukenrenovatie',
          slug: 'keukenrenovatie-checklist',
          meta: {
            description:
              'Een complete gids voor het voorbereiden van uw keukenrenovatie. Van budgettering tot het kiezen van het juiste sloopbedrijf.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Een keukenrenovatie is een van de meest ingrijpende veranderingen in uw woning. Of u nu een complete metamorfose plant of alleen de keukenkasten wilt vervangen, goede voorbereiding is essentieel voor een succesvol resultaat. Na meer dan 25 jaar ervaring met keukenslopen hebben we een uitgebreide checklist samengesteld die u helpt om uw project soepel te laten verlopen.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Fase 1: Planning en budget' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Voordat u begint met slopen, is het belangrijk om een duidelijk plan te hebben. Dit bespaart u niet alleen geld, maar ook frustratie tijdens het proces.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Begin met het bepalen van uw totale budget. Reken niet alleen op de kosten van de nieuwe keuken, maar ook op:\n• Sloopwerkzaamheden (€800-2500 afhankelijk van complexiteit)\n• Eventuele aanpassingen aan leidingen en elektra\n• Vloerherstel of nieuwe vloerbedekking\n• Schilderwerk aan wanden en plafonds\n• Onvoorziene kosten: reserveer altijd 10-15% extra',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Fase 2: Voorbereiding van de werkruimte' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Een goede voorbereiding is het halve werk. Dit zijn de stappen die u zelf kunt nemen voordat het sloopbedrijf arriveert:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Leeg alle kasten en laden volledig\n• Haal losse apparaten los (magnetron, koffiezetapparaat)\n• Zorg voor een alternatieve keuken: een magnetron en waterkoker in de woonkamer zijn essentieel\n• Bescherm vloeren in andere ruimtes met karton of stofdoeken\n• Verwijder waardevolle items uit de buurt van stof\n• Zorg voor goede ventilatie: open ramen en deuren',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Fase 3: Technische voorbereiding' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Dit zijn cruciale stappen die professionals vaak voor u uitvoeren, maar waar u zich bewust van moet zijn:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Gas, water en elektra:\n• Laat het gas afsluiten door een erkend installateur\n• Sluit de hoofdkraan van het water af en laat de leidingen lopen tot ze leeg zijn\n• Schakel de groepen van de keuken af in de meterkast\n• Laat de elektra veilig afkoppelen door een elektricien\n\nLet op: Dit zijn werkzaamheden die u in de meeste gevallen niet zelf mag doen vanwege verzekeringstechnische redenen.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Fase 4: Kies het juiste sloopbedrijf' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Niet elk sloopbedrijf is hetzelfde. Bij het kiezen van een partner voor uw keukensloop moet u letten op:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Ervaring met keukenrenovaties: vraag naar referenties\n• Verzekering: het bedrijf moet minimaal een WA-verzekering hebben\n• Afvalverwerking: hoe wordt het afval gescheiden en afgevoerd?\n• Werktijden: zijn ze flexibel qua timing?\n• Garantie: bieden ze garantie op hun werkzaamheden?\n• Communicatie: reageren ze snel op vragen en zijn ze duidelijk?',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Wat kunt u zelf doen om te besparen?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Hoewel professionele hulp essentieel is, zijn er zaken die u zelf kunt doen om kosten te besparen:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Verkoop bruikbare onderdelen: kastdeuren, laden, apparaten die nog werken\n• Sorteer afval zelf: hout, metaal en steenafval gescheiden aanbieden is goedkoper\n• Vraag meerdere offertes aan: vergelijk prijzen en voorwaarden\n• Plan in het laagseizoen: in de winter zijn sloopbedrijven vaak goedkoper\n• Wees flexibel met data: een paar dagen verschuiving kan flink schelen in prijs',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Veelgemaakte fouten' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Om u te helpen voorkomen dat u in dezelfde valkuilen trapt als anderen, hier de meest voorkomende fouten:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '1. Geen rekening houden met de verbouwingsstof: dit dringt overal doorheen\n2. Vergeten de buurman te waarschuwen: stof en geluidsoverlast kunnen conflicten veroorzaken\n3. Onvoldoende budget reserveren voor onvoorziene kosten\n4. Te snel beginnen zonder goede planning\n5. Zelf aan de slag gaan met leidingen en elektra\n6. Geen rekening houden met de levertijd van de nieuwe keuken',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Bij TitanBreakers helpen we u graag met al uw vragen over keukensloop. Neem vrijblijvend contact met ons op voor een offerte op maat.',
                    },
                  ],
                },
              ],
            },
          },
        },
        en: {
          title: 'The Ultimate Checklist for Your Kitchen Renovation',
          slug: 'kitchen-renovation-checklist',
          meta: {
            description:
              'A complete guide to preparing for your kitchen renovation. From budgeting to choosing the right demolition company.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'A kitchen renovation is one of the most significant changes you can make to your home. Whether you are planning a complete metamorphosis or just want to replace the kitchen cabinets, good preparation is essential for a successful outcome. After more than 25 years of experience with kitchen demolitions, we have compiled an extensive checklist to help your project run smoothly.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Phase 1: Planning and Budget' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Before you start demolition, it is important to have a clear plan. This not only saves you money but also frustration during the process.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Start by determining your total budget. Calculate not only the costs of the new kitchen, but also:\n• Demolition work (€800-2500 depending on complexity)\n• Possible adjustments to pipes and electricity\n• Floor repair or new flooring\n• Painting of walls and ceilings\n• Unexpected costs: always reserve an extra 10-15%',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Phase 2: Preparing the Work Area' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Good preparation is half the battle. These are the steps you can take yourself before the demolition company arrives:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Completely empty all cabinets and drawers\n• Disconnect loose appliances (microwave, coffee maker)\n• Set up an alternative kitchen: a microwave and kettle in the living room are essential\n• Protect floors in other rooms with cardboard or dust cloths\n• Remove valuable items from the vicinity of dust\n• Ensure good ventilation: open windows and doors',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Phase 3: Technical Preparation' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'These are crucial steps that professionals often carry out for you, but that you should be aware of:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Gas, water, and electricity:\n• Have the gas turned off by a certified installer\n• Turn off the main water tap and let the pipes run until empty\n• Switch off the kitchen groups in the meter cupboard\n• Have the electricity safely disconnected by an electrician\n\nNote: These are tasks that you are generally not allowed to do yourself for insurance reasons.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    { type: 'text', text: 'Phase 4: Choose the Right Demolition Company' },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Not every demolition company is the same. When choosing a partner for your kitchen demolition, pay attention to:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Experience with kitchen renovations: ask for references\n• Insurance: the company must have at least liability insurance\n• Waste processing: how is the waste separated and disposed of?\n• Working hours: are they flexible with timing?\n• Warranty: do they offer a warranty on their work?\n• Communication: do they respond quickly to questions and are they clear?',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'What Can You Do Yourself to Save Money?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Although professional help is essential, there are things you can do yourself to save costs:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Sell usable parts: cabinet doors, drawers, appliances that still work\n• Sort waste yourself: offering wood, metal, and masonry waste separately is cheaper\n• Request multiple quotes: compare prices and conditions\n• Plan in the low season: in winter, demolition companies are often cheaper\n• Be flexible with dates: shifting a few days can make a big difference in price',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Common Mistakes' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'To help you avoid falling into the same pitfalls as others, here are the most common mistakes:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '1. Not accounting for renovation dust: it penetrates everywhere\n2. Forgetting to warn the neighbor: dust and noise nuisance can cause conflicts\n3. Not reserving enough budget for unexpected costs\n4. Starting too quickly without good planning\n5. Tackling pipes and electricity yourself\n6. Not accounting for the delivery time of the new kitchen',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'At TitanBreakers, we are happy to help you with all your questions about kitchen demolition. Feel free to contact us for a customized quote.',
                    },
                  ],
                },
              ],
            },
          },
        },
        categoryIndex: 1,
        heroImage: project1Image,
      },
      {
        nl: {
          title: 'Professioneel badkamers slopen: dit moet u weten',
          slug: 'badkamer-slopen-professioneel',
          meta: {
            description:
              'Een complete gids voor badkamersloop. Lees alles over leidingen, waterdichting en het voorkomen van waterschade.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Een badkamer slopen is een specialistisch karwei dat meer vraagt dan alleen een hamer en wat spierkracht. Met al die waterleidingen, riolering en waterdichte lagen is het risico op waterschade groot als u niet precies weet wat u doet. In dit artikel delen we onze expertise uit meer dan 25 jaar badkamersloop.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Waarom is badkamersloop anders?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Een badkamer is uniek omdat het de enige ruimte in huis is waar zoveel waterleidingen samenkomen. Daarnaast is de waterdichting essentieel voor de rest van uw woning. Een kleine fout kan leiden tot:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Waterschade in de onderliggende ruimtes\n• Problemen met de riolering die impact hebben op het hele huis\n• Beschadiging van de constructie door insijpelend vocht\n• Schimmelvorming in muren en vloeren\n• Hoge kosten voor herstelwerkzaamheden',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'De eerste stap: het water afsluiten' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Dit lijkt logisch, maar u zou versteld staan hoe vaak dit misgaat. Sluit niet alleen de hoofdkraan af, maar ook de individuele afsluiters van:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• De douche en badkraan\n• Het toilet\n• De wastafel\n• De wasmachine-aansluiting (indien aanwezig)\n• Eventuele bidet of urinoir\n\nOpen daarna alle kranen tot ze leeg zijn. Er zit altijd nog water in de leidingen dat eruit moet.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Het belang van riolering' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'De riolering is het zenuwcentrum van uw badkamer. Bij het slopen moet u extra voorzichtig zijn met:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'De toiletafvoer: Dit is vaak een PVC-buis die gemakkelijk breekt als erop wordt gestampt. Zorg dat de vloer rondom het toilet als eerste wordt vrijgemaakt.\n\nDe doucheafvoer: Deze zit meestal ingebouwd in de vloer. Verwijder tegels zorgvuldig vanuit het midden naar buiten om de afvoer niet te beschadigen.\n\nDe wasbekeraansluiting: Deze wordt vaak over het hoofd gezien maar kan gemakkelijk beschadigd raken bij tegelverwijdering.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Tegels verwijderen zonder schade' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Het verwijderen van badkamertegels is een vak apart. Doe dit verkeerd en u beschadigt de ondergrond waardoor het plaatsen van nieuwe tegels duurder wordt.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'De juiste werkwijze:\n1. Begin altijd bij een losse tegel of maak een tegel kapot als startpunt\n2. Werk van onder naar boven bij wanden\n3. Gebruik een tegelsteker en hamer, geen sloopbijl\n4. Wees extra voorzichtig rondom leidingen\n5. Verwijder eerst voegsel om de tegels los te maken\n6. Raap groot puim direct op om beschadiging te voorkomen',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Waterdichte lagen behouden' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Moderne badkamers hebben meerdere waterdichte lagen (ook wel dampremmende folie of tiento genoemd). Als deze intact blijven, scheelt dat u enorm in kosten bij de nieuwbouw.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Tips om waterdichting te behouden:\n• Snijd tegels los van de ondergrond in plaats van ze eraf te hakken\n• Gebruik geen zware machines die de folie kunnen scheuren\n• Controleer de folie na verwijdering op beschadigingen\n• Fotografeer de waterdichting voor uw aannemer\n• Repareer kleine scheurtjes direct met speciale tape',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Wanneer schakelt u een professional in?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Sommige klussen kunt u zelf doen, maar bij badkamersloop adviseren wij om in de volgende gevallen een professional in te schakelen:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• De badkamer ligt boven een andere ruimte\n• Er is sprake van vloerverwarming\n• De badkamer is voorzien van inloopdouche met speciale afvoer\n• Er zijn leidingen in de vloer of wanden ingebouwd\n• U twijfelt over de constructie van vloer of wanden\n• Het is een appartement met buren onder of naast u',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Kosten en tijdsindicatie' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'De kosten voor badkamersloop variëren sterk afhankelijk van de grootte en complexiteit:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Kleine badkamer (tot 5m²): €600-900\nMiddelgrote badkamer (5-10m²): €900-1500\nGrote badkamer (10m²+): €1500-2500\n\nTijdsindicatie: Een standaard badkamersloop duurt 1-2 werkdagen. Bij complexe situaties met veel tegels of vloerverwarming kan dit oplopen tot 3 dagen.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Wilt u meer weten over professionele badkamersloop? Neem contact op met TitanBreakers voor een vrijblijvend gesprek en offerte.',
                    },
                  ],
                },
              ],
            },
          },
        },
        en: {
          title: 'Professional Bathroom Demolition: What You Need to Know',
          slug: 'bathroom-demolition-professional',
          meta: {
            description:
              'A complete guide to bathroom demolition. Read all about pipes, waterproofing and preventing water damage.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Demolishing a bathroom is a specialized job that requires more than just a hammer and some muscle power. With all those water pipes, sewage, and waterproof layers, the risk of water damage is high if you do not know exactly what you are doing. In this article, we share our expertise from more than 25 years of bathroom demolition.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Why is Bathroom Demolition Different?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'A bathroom is unique because it is the only room in the house where so many water pipes come together. In addition, waterproofing is essential for the rest of your home. A small mistake can lead to:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Water damage in underlying rooms\n• Problems with the sewage system that impact the entire house\n• Damage to the structure from seeping moisture\n• Mold formation in walls and floors\n• High costs for restoration work',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The First Step: Turning Off the Water' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'This seems logical, but you would be surprised how often this goes wrong. Do not only turn off the main tap, but also the individual shut-off valves for:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• The shower and bath tap\n• The toilet\n• The sink\n• The washing machine connection (if present)\n• Any bidet or urinal\n\nThen open all taps until they are empty. There is always water in the pipes that needs to come out.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The Importance of Sewage' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The sewage system is the nerve center of your bathroom. When demolishing, you must be extra careful with:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The toilet drain: This is often a PVC pipe that breaks easily when stepped on. Make sure the floor around the toilet is cleared first.\n\nThe shower drain: This is usually built into the floor. Carefully remove tiles from the center outwards to avoid damaging the drain.\n\nThe sink connection: This is often overlooked but can easily be damaged during tile removal.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Removing Tiles Without Damage' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Removing bathroom tiles is a specialty in itself. Do this wrong and you damage the substrate, making the installation of new tiles more expensive.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The correct method:\n1. Always start at a loose tile or break one tile as a starting point\n2. Work from bottom to top on walls\n3. Use a tile chisel and hammer, not a sledgehammer\n4. Be extra careful around pipes\n5. Remove grout first to loosen the tiles\n6. Pick up large debris immediately to prevent damage',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Preserving Waterproof Layers' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Modern bathrooms have multiple waterproof layers (also called vapor barrier foil or tiento). If these remain intact, it saves you enormously in costs during rebuilding.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Tips to preserve waterproofing:\n• Cut tiles loose from the substrate instead of hacking them off\n• Do not use heavy machinery that can tear the foil\n• Check the foil for damage after removal\n• Photograph the waterproofing for your contractor\n• Repair small cracks immediately with special tape',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'When Should You Hire a Professional?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Some jobs you can do yourself, but for bathroom demolition, we advise hiring a professional in the following cases:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• The bathroom is above another room\n• There is underfloor heating\n• The bathroom has a walk-in shower with a special drain\n• Pipes are built into the floor or walls\n• You are unsure about the structure of the floor or walls\n• It is an apartment with neighbors below or next to you',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Costs and Time Indication' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The costs for bathroom demolition vary greatly depending on size and complexity:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Small bathroom (up to 5m²): €600-900\nMedium bathroom (5-10m²): €900-1500\nLarge bathroom (10m²+): €1500-2500\n\nTime indication: A standard bathroom demolition takes 1-2 working days. For complex situations with many tiles or underfloor heating, this can increase to 3 days.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Want to know more about professional bathroom demolition? Contact TitanBreakers for a free consultation and quote.',
                    },
                  ],
                },
              ],
            },
          },
        },
        categoryIndex: 2,
        heroImage: project2Image,
      },
      {
        nl: {
          title: 'TitanBreakers 25 jaar: een kwart eeuw vakmanschap',
          slug: 'titanbreakers-25-jaar-jubileum',
          meta: {
            description:
              'TitanBreakers viert haar 25-jarig jubileum. Terugblik op 25 jaar sloopwerkzaamheden, groei en duurzaamheid.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Dit jaar is het precies 25 jaar geleden dat TitanBreakers werd opgericht. Wat begon als een klein familiebedrijf is uitgegroeid tot een gerenommeerd sloopbedrijf met meer dan 50 professionals. In dit jubileumartikel nemen we u mee door onze geschiedenis, delen we hoogtepunten en kijken we vooruit naar de toekomst.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: '1999: De begindagen' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In 1999 startten Jan en Piet TitanBreakers vanuit een kleine garage in Rotterdam. Met niets meer dan een bestelbus, basisgereedschap en een droom om het beste sloopbedrijf van Nederland te worden, gingen ze van start. De eerste jaren waren gericht op kleine klussen: keukentjes slopen, badkamers strippen en het helpen van particulieren met hun verbouwingsplannen.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '"We deden toen alles zelf", herinnert Jan zich. "Van offertes maken tot het daadwerkelijke slopen en zelfs het afvoeren van het puin. Maar we deden het met passie en dat zagen onze klanten."',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: '2005: Groei en professionalisering' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Rond 2005 werd het tijd om te professionaliseren. Het bedrijf groeide en de eerste werknemers werden aangenomen. Ook behaalden we onze eerste certificeringen, waaronder het VCA** certificaat voor veiligheid. Dit was een keerpunt: grote bedrijven en aannemers durfden ons nu in te huren voor hun projecten.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Deze periode kenmerkte zich ook door investeringen in duurzaamheid. Terwijl andere bedrijven alles op dezelfde hoop gooiden, introduceerden wij al scheiding van afvalstromen. Een revolutie in de branche die nu standaard is, maar toen innovatief.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: '2010-2015: Landelijke expansie' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'De jaren 2010-2015 stonden in het teken van groei. Vanuit Rotterdam breidden we onze werkzaamheden uit naar Den Haag, Utrecht en later zelfs Amsterdam. We openden depots door het hele land en ons team groeide naar meer dan 25 medewerkers.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Belangrijke mijlpalen in deze periode:\n• 2012: Certificering voor asbestverwijdering\n• 2013: Opening kantoor in Den Haag\n• 2014: 100e project voltooid\n• 2015: ISO 9001 certificering voor kwaliteitsmanagement',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Milieubewust ondernemen' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Een van de pijlers van TitanBreakers is duurzaamheid. Al vanaf het begin vonden we het belangrijk om verantwoord om te gaan met ons milieu. Inmiddels recyclen we maar liefst 98% van al ons sloopafval.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '"Dat begon eigenlijk uit noodzaak", legt Piet uit. "We hadden niet genoeg ruimte om alles bij elkaar te dumpen, dus moesten we scheiden. Maar we ontdekten al snel dat dit niet alleen beter was voor het milieu, maar ook nog eens rendabeler. Nu is het een van onze unique selling points."',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Het team: onze grootste trots' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Wat begon met 2 man, is inmiddels gegroeid naar een hecht team van meer dan 50 professionals. Wat ons betreft is dat de grootste prestatie van de afgelopen 25 jaar. Onze mensen zijn niet alleen gespecialiseerd en gecertificeerd, maar delen ook onze passie voor het vak.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Het gemiddelde dienstverband bij TitanBreakers is maar liefst 8 jaar - bizar hoog in deze branche. Dat komt doordat we investeren in onze mensen: opleidingen, goede arbeidsvoorwaarden en een hechte teamsfeer. We zijn trots dat we een erkend leerbedrijf zijn waar jonge vakmensen zich kunnen ontwikkelen.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Cijfers en feiten' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Ter illustratie van onze groei: in 25 jaar hebben we:\n\n• Meer dan 5.000 projecten succesvol afgerond\n• Ruim 15.000 ton sloopafval gerecycled\n• 50+ vaste medewerkers in dienst\n• 4 vestigingen door heel Nederland\n• Een klanttevredenheidsscore van 4.8/5.0\n• Nul ernstige ongevallen door onze focus op veiligheid',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Terugblik: memorabele projecten' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In 25 jaar hebben we veel bijzondere projecten mogen doen. Van het strippen van oude scholen en ziekenhuizen tot het voorbereiden van monumentale panden voor renovatie. Elk project heeft ons gevormd tot het bedrijf dat we vandaag zijn.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Een project dat ons bijzonder is bijgebleven was de renovatie van een 17e-eeuws grachtenpand in Amsterdam. De eigenaar wilde de originele balkenstructuur behouden terwijl de hele binnenruimte werd gestript. Met handmatige technieken hebben we dit voor elkaar gekregen zonder ook maar één historisch element te beschadigen. Dat soort uitdagingen zijn waar we het voor doen.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'De toekomst' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Terwijl we terugkijken op 25 jaar succes, kijken we ook vol vertrouwing naar de toekomst. De bouwsector verandert snel en wij veranderen mee. Duurzaamheid, circulariteit en innovatie staan centraal in onze plannen voor de komende jaren.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Jan en Piet: "We zijn trots op wat we hebben bereikt, maar we zijn nog lang niet klaar. De komende 25 jaar gaan we door met waar we goed in zijn: professioneel sloopwerk met aandacht voor mens, milieu en kwaliteit."',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Bedankt aan al onze klanten, medewerkers en partners voor het vertrouwen in TitanBreakers. Op naar de volgende 25 jaar!',
                    },
                  ],
                },
              ],
            },
          },
        },
        en: {
          title: 'TitanBreakers 25 Years: A Quarter Century of Craftsmanship',
          slug: 'titanbreakers-25-years-anniversary',
          meta: {
            description:
              'TitanBreakers celebrates its 25th anniversary. Looking back on 25 years of demolition work, growth and sustainability.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'This year marks exactly 25 years since TitanBreakers was founded. What started as a small family business has grown into a renowned demolition company with more than 50 professionals. In this anniversary article, we take you through our history, share highlights, and look ahead to the future.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: '1999: The Early Days' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In 1999, Jan and Piet started TitanBreakers from a small garage in Rotterdam. With nothing more than a van, basic tools, and a dream of becoming the best demolition company in the Netherlands, they got started. The first years focused on small jobs: demolishing kitchens, stripping bathrooms, and helping private individuals with their renovation plans.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '"We did everything ourselves back then," Jan recalls. "From making quotes to the actual demolition and even hauling away the debris. But we did it with passion and our customers saw that."',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: '2005: Growth and Professionalization' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Around 2005, it was time to professionalize. The company was growing and the first employees were hired. We also obtained our first certifications, including the VCA** certificate for safety. This was a turning point: large companies and contractors dared to hire us for their projects.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'This period was also characterized by investments in sustainability. While other companies threw everything on the same pile, we introduced waste stream separation. A revolution in the industry that is now standard, but was innovative at the time.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: '2010-2015: National Expansion' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The years 2010-2015 were all about growth. From Rotterdam, we expanded our activities to The Hague, Utrecht, and later even Amsterdam. We opened depots throughout the country and our team grew to more than 25 employees.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Important milestones in this period:\n• 2012: Certification for asbestos removal\n• 2013: Opening office in The Hague\n• 2014: 100th project completed\n• 2015: ISO 9001 certification for quality management',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Environmentally Conscious Business' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'One of the pillars of TitanBreakers is sustainability. From the beginning, we found it important to deal responsibly with our environment. Meanwhile, we recycle no less than 98% of all our demolition waste.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '"That actually started out of necessity," Piet explains. "We did not have enough space to dump everything together, so we had to separate. But we soon discovered that this was not only better for the environment, but also more profitable. Now it is one of our unique selling points."',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The Team: Our Greatest Pride' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'What started with 2 men has now grown into a close-knit team of more than 50 professionals. In our opinion, that is the greatest achievement of the past 25 years. Our people are not only specialized and certified, but also share our passion for the trade.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The average tenure at TitanBreakers is no less than 8 years - bizarrely high in this industry. That is because we invest in our people: training, good working conditions, and a close-knit team atmosphere. We are proud to be a recognized training company where young professionals can develop.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Figures and Facts' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'To illustrate our growth: in 25 years we have:\n\n• Successfully completed more than 5,000 projects\n• Recycled more than 15,000 tons of demolition waste\n• Employed 50+ permanent staff\n• 4 locations throughout the Netherlands\n• A customer satisfaction score of 4.8/5.0\n• Zero serious accidents due to our focus on safety',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Retrospective: Memorable Projects' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In 25 years, we have had the opportunity to do many special projects. From stripping old schools and hospitals to preparing monumental buildings for renovation. Each project has shaped us into the company we are today.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'One project that particularly stuck with us was the renovation of a 17th-century canal house in Amsterdam. The owner wanted to preserve the original beam structure while the entire interior space was stripped. With manual techniques, we managed to achieve this without damaging a single historic element. That kind of challenge is what we do it for.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The Future' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'While we look back on 25 years of success, we also look to the future with confidence. The construction sector is changing rapidly and we are changing with it. Sustainability, circularity, and innovation are central to our plans for the coming years.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Jan and Piet: "We are proud of what we have achieved, but we are far from done. The next 25 years we will continue doing what we are good at: professional demolition work with attention to people, environment, and quality."',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Thank you to all our customers, employees, and partners for their trust in TitanBreakers. Here is to the next 25 years!',
                    },
                  ],
                },
              ],
            },
          },
        },
        categoryIndex: 4,
        heroImage: aboutTeamImage,
      },
      {
        nl: {
          title: 'Duurzaam slopen: onze bijdrage aan de circulaire economie',
          slug: 'duurzaam-slopen-circulaire-economie',
          meta: {
            description:
              'Hoe TitanBreakers met 98% recycling bijdraagt aan een duurzame toekomst. Lees alles over onze milieubewuste werkwijze.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In een tijd waarin duurzaamheid steeds belangrijker wordt, is de bouwsector een van de grootste uitdagers. Jaarlijks produceren we miljoenen tonnen bouwafval. Maar wat als we dit afval zouden zien als grondstof? Bij TitanBreakers geloven we in circulair slopen: het zorgvuldig demonteren van gebouwen zodat materialen een tweede leven krijgen.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Het probleem: bouwafval in Nederland' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: "Nederland produceert jaarlijks zo'n 25 miljoen ton bouw- en sloopafval. Dat is meer dan de helft van alle afval dat we als land produceren. Het merendeel hiervan belandt nog steeds op de stortplaats of wordt verbrand, terwijl veel materialen prima herbruikbaar zijn.",
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Dit heeft grote gevolgen voor het milieu:\n• Grondstoffen raken uitgeput door continue winning\n• Stortplaatsen vullen sneller, waardoor nieuwe locaties nodig zijn\n• Transport van afval kost veel CO2-uitstoot\n• Waardevolle materialen worden vernietigd in plaats van hergebruikt',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Onze aanpak: circulair slopen' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Bij TitanBreakers doen we het anders. In plaats van alles met een grote graafmachine plat te gooien, werken we met precisie. Onze ervaren slopers demonteren gebouwen bijna letterlijk steen voor steen. Dit kost meer tijd, maar levert enorm veel op:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Meer dan 98% van ons afval wordt gerecycled\n• Materialen behouden hun waarde en kwaliteit\n• Minder CO2-uitstoot door minder nieuwe productie\n• Lagere kosten voor onze klanten doordat afvalscheiding rendabel is\n• Bijdrage aan de circulaire economie',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Hoe werkt het in de praktijk?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Ons proces begint al voordat we met slopen beginnen. Voor elk project maken we een afvalplan waarin we bepalen welke materialen er aanwezig zijn en hoe we deze kunnen scheiden.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Tijdens de sloop zelf werken we met verschillende afvalstromen:\n\nHout: Oude balken, vloerdelen en kozijnen worden gesorteerd op kwaliteit. Het beste hout gaat naar hergebruik, bijvoorbeeld voor meubels of nieuwe constructies. Lagerwaardig hout wordt gebruikt voor chipboard of biomassa.\n\nMetaal: Koperen leidingen, ijzeren balken en aluminium profielen worden apart ingezameld. Metalen zijn oneindig recyclebaar zonder kwaliteitsverlies.\n\nMetselwerk: Bakstenen en beton worden gebroken en gebruikt als funderingsmateriaal of wegenbouw. Ook dit scheelt enorm op de winning van nieuwe grondstoffen.\n\nTegels en sanitair: Gebruikte tegels in goede staat worden gedoneerd aan sociale projecten of verkocht. Sanitair wordt demonteeerd en afgevoerd naar gespecialiseerde recyclers.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Samenwerking met partners' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'We staan er niet alleen voor in onze duurzaamheidsmissie. We werken samen met diverse partners:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Sociale werkplaatsen die herbruikbare materialen opknappen\n• Recyclingsbedrijven die gespecialiseerd zijn in specifieke afvalstromen\n• Architecten en aannemers die circulaire materialen willen gebruiken\n• Gemeenten die duurzaam bouwen stimuleren\n• Universiteiten die onderzoek doen naar nieuwe recyclingsmethoden',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'De voordelen voor u als klant' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'U denkt misschien: mooi dat het duurzaam is, maar wat levert het mij op? Het antwoord: meer dan u denkt!',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Kostenbesparing: Door het zorgvuldig scheiden van afval zijn de afvoerkosten lager. Gescheiden afval is goedkoper dan gemengd puin. Bovendien kunnen waardevolle materialen soms worden verkocht, wat de kosten verder drukt.\n\nImago: Steeds meer bedrijven en particulieren willen duurzaam bouwen. Door te kiezen voor een circulair sloopbedrijf draagt u bij aan een groen imago.\n\nToekomstbestendig: De overheid stelt steeds strengere eisen aan afvalscheiding en recycling. Door nu al circulair te slopen, bent u voorbereid op toekomstige regelgeving.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Success stories' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Een recent voorbeeld is de sloop van een oude school in Utrecht. In plaats van alles naar de stort te brengen, hebben we:\n\n• 85% van het hout hergebruikt voor meubels en decoratie\n• Alle metalen leidingen gerecycled\n• Historische tegels gedoneerd aan een sociaal project\n• Het oude schoolbord opgeknapt en teruggegeven aan de buurt\n\nHet resultaat: slechts 2% van het totale afval is daadwerkelijk als restafval afgevoerd.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'De toekomst van circulair slopen' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'We zijn trots op wat we hebben bereikt, maar we zijn er nog niet. De komende jaren willen we onze recyclingpercentage verder verhogen naar 99%. Ook werken we aan nieuwe methoden om nog meer materialen te hergebruiken.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Innovaties waar we mee bezig zijn:\n• Digitalisering van materiaalpasspoorten zodat herkomst en kwaliteit van materialen makkelijk te traceren zijn\n• Samenwerking met 3D-printbedrijven die gerecycled plastic gebruiken\n• Ontwikkeling van nieuwe technieken om beton volledig te recyclen\n• Onderzoek naar het hergebruik van isolatiematerialen',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Wilt u ook circulair slopen en bijdragen aan een duurzame toekomst? Neem contact met ons op voor een vrijblijvend gesprek. Samen kijken we hoe we uw project zo duurzaam mogelijk kunnen aanpakken.',
                    },
                  ],
                },
              ],
            },
          },
        },
        en: {
          title: 'Sustainable Demolition: Our Contribution to the Circular Economy',
          slug: 'sustainable-demolition-circular-economy',
          meta: {
            description:
              'How TitanBreakers contributes to a sustainable future with 98% recycling. Read all about our environmentally conscious working method.',
          },
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In a time when sustainability is becoming increasingly important, the construction sector is one of the biggest challenges. Every year we produce millions of tons of construction waste. But what if we viewed this waste as a resource? At TitanBreakers, we believe in circular demolition: carefully dismantling buildings so that materials get a second life.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    { type: 'text', text: 'The Problem: Construction Waste in the Netherlands' },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'The Netherlands produces about 25 million tons of construction and demolition waste annually. That is more than half of all waste we produce as a country. The majority of this still ends up in landfills or is incinerated, while many materials are perfectly reusable.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'This has major consequences for the environment:\n• Raw materials are depleted through continuous extraction\n• Landfills fill up faster, requiring new locations\n• Transport of waste costs a lot of CO2 emissions\n• Valuable materials are destroyed instead of reused',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Our Approach: Circular Demolition' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'At TitanBreakers, we do things differently. Instead of flattening everything with a large excavator, we work with precision. Our experienced demolition workers literally dismantle buildings brick by brick. This takes more time, but yields enormous benefits:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• More than 98% of our waste is recycled\n• Materials retain their value and quality\n• Less CO2 emissions from less new production\n• Lower costs for our customers because waste separation is profitable\n• Contribution to the circular economy',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'How Does It Work in Practice?' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Our process begins before we start demolition. For each project, we create a waste plan in which we determine what materials are present and how we can separate them.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'During the demolition itself, we work with different waste streams:\n\nWood: Old beams, floorboards, and window frames are sorted by quality. The best wood goes for reuse, for example for furniture or new constructions. Lower-grade wood is used for chipboard or biomass.\n\nMetal: Copper pipes, iron beams, and aluminum profiles are collected separately. Metals are infinitely recyclable without loss of quality.\n\nMasonry: Bricks and concrete are crushed and used as foundation material or road construction. This also saves enormously on the extraction of new raw materials.\n\nTiles and sanitary: Used tiles in good condition are donated to social projects or sold. Sanitary ware is dismantled and transported to specialized recyclers.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Collaboration with Partners' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'We are not alone in our sustainability mission. We work with various partners:',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '• Social workshops that refurbish reusable materials\n• Recycling companies specialized in specific waste streams\n• Architects and contractors who want to use circular materials\n• Municipalities that stimulate sustainable construction\n• Universities researching new recycling methods',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The Benefits for You as a Customer' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'You might think: nice that it is sustainable, but what does it get me? The answer: more than you think!',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Cost savings: By carefully separating waste, disposal costs are lower. Separated waste is cheaper than mixed rubble. Moreover, valuable materials can sometimes be sold, further reducing costs.\n\nImage: More and more companies and individuals want to build sustainably. By choosing a circular demolition company, you contribute to a green image.\n\nFuture-proof: The government is setting increasingly strict requirements for waste separation and recycling. By already demolishing circularly, you are prepared for future regulations.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Success Stories' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'A recent example is the demolition of an old school in Utrecht. Instead of sending everything to the landfill, we:\n\n• Reused 85% of the wood for furniture and decoration\n• Recycled all metal pipes\n• Donated historic tiles to a social project\n• Refurbished the old school board and returned it to the neighborhood\n\nThe result: only 2% of the total waste was actually disposed of as residual waste.',
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'The Future of Circular Demolition' }],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'We are proud of what we have achieved, but we are not there yet. In the coming years, we want to further increase our recycling percentage to 99%. We are also working on new methods to reuse even more materials.',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Innovations we are working on:\n• Digitization of material passports so that origin and quality of materials are easy to trace\n• Collaboration with 3D printing companies that use recycled plastic\n• Development of new techniques to fully recycle concrete\n• Research into the reuse of insulation materials',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Want to demolish circularly too and contribute to a sustainable future? Contact us for a free consultation. Together we look at how we can approach your project as sustainably as possible.',
                    },
                  ],
                },
              ],
            },
          },
        },
        categoryIndex: 4,
        heroImage: heroImage,
      },
    ]

    for (const post of postsData) {
      const postData: any = {
        title: post.nl.title,
        slug: post.nl.slug,
        content: post.nl.content,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      }

      if (post.heroImage) {
        postData.heroImage = post.heroImage.id
      }

      if (createdCategories[post.categoryIndex]) {
        postData.categories = [createdCategories[post.categoryIndex].id]
      }

      const created = await payload.create({
        collection: 'posts',
        data: postData as any,
        context: { disableRevalidate: true },
      })

      await payload.update({
        collection: 'posts',
        id: created.id,
        locale: 'en',
        data: {
          title: post.en.title,
          slug: post.en.slug,
          content: post.en.content,
        } as any,
        context: { disableRevalidate: true },
      })

      console.log(`  ✓ Created: ${post.nl.title} / ${post.en.title}`)
    }

    console.log('\n🎉 ALL content with translations seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding translations:', error)
    process.exit(1)
  }
}

seedAllTranslations()
