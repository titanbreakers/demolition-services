import { getPayload } from 'payload'
import config from '../src/payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Seeding Services...')

    const services = [
      {
        title: 'Gebouwen Sloop',
        description:
          'Complete sloop van woningen, kantoren en commerciële gebouwen. Van monumentale panden tot moderne kantoorgebouwen - wij zorgen voor een veilige en efficiënte afbraak.',
        icon: 'Building2',
        featured: true,
      },
      {
        title: 'Industriële Demontage',
        description:
          'Specialistische demontage van fabrieken, opslagloodsen en industriële installaties. Wij hebben ervaring met complexe industriële omgevingen.',
        icon: 'Factory',
        featured: true,
      },
      {
        title: 'Asbest Sanering',
        description:
          'Gecertificeerde verwijdering van asbesthoudende materialen volgens SC-530. Veilig voor mens en milieu, conform alle wettelijke eisen.',
        icon: 'Trash2',
        featured: true,
      },
      {
        title: 'Recycling & Afvoer',
        description:
          'Duurzame verwerking en recycling van sloopafval. Wij scheiden en verwerken alle materialen milieuvriendelijk met een recyclingpercentage van 98%.',
        icon: 'Recycle',
        featured: true,
      },
    ]

    for (const service of services) {
      await payload.create({
        collection: 'services',
        data: service,
      })
    }

    console.log('✅ Services seeded')

    console.log('🌱 Seeding Projects...')

    const projects = [
      {
        title: 'Oude Fabriek Rotterdam',
        description:
          'Complete demontage van een voormalige staalfabriek van 15.000m² inclusief asbestsanering en grondwerk.',
        category: 'demolition' as const,
        completed: new Date('2024-06-15').toISOString(),
        featured: true,
      },
      {
        title: 'Kantoorcomplex Zuidas',
        description:
          'Gecontroleerde sloop van een 12-verdiepingen kantoorgebouw in stedelijk gebied met minimale overlast.',
        category: 'demolition' as const,
        completed: new Date('2024-03-20').toISOString(),
        featured: true,
      },
      {
        title: 'Winkelcentrum Renovatie',
        description:
          'Selectieve strip-out van 15.000m² winkelruimte voor herontwikkeling tot mixed-use complex.',
        category: 'renovation' as const,
        completed: new Date('2023-11-10').toISOString(),
        featured: true,
      },
      {
        title: 'Haventerrein Demontage',
        description:
          "Demontage van havenkranen, silo's en opslagloodsen op een voormalig haventerrein.",
        category: 'demolition' as const,
        completed: new Date('2023-09-05').toISOString(),
        featured: true,
      },
      {
        title: 'Woningbouwproject Den Haag',
        description:
          'Sloop van verouderde portiekflats om plaats te maken voor 200 nieuwe duurzame woningen.',
        category: 'demolition' as const,
        completed: new Date('2023-07-22').toISOString(),
        featured: true,
      },
      {
        title: 'Ziekenhuis Renovatie',
        description:
          'Gefaseerde strip-out van ziekenhuisvleugels tijdens operationele bezetting van het gebouw.',
        category: 'renovation' as const,
        completed: new Date('2022-12-15').toISOString(),
        featured: true,
      },
    ]

    for (const project of projects) {
      await payload.create({
        collection: 'projects',
        data: project,
      })
    }

    console.log('✅ Projects seeded')

    console.log('🌱 Seeding Blog Posts...')

    // Simple blog posts with basic content to avoid rich text complexity
    const blogPosts = [
      {
        title: 'Nieuwe Veiligheidsnormen in de Sloopindustrie 2024',
        content:
          'De sloopindustrie blijft evolueren, en 2024 brengt belangrijke wijzigingen in veiligheidsnormen. Bij TitanBrekers zijn we trots op het voldoen aan de nieuwste VCA-certificeringseisen. De meest significante veranderingen omvatten strengere eisen voor asbestsanering, verbeterde persoonlijke beschermingsmiddelen, en nieuwe protocollen voor werken op hoogte. Onze teams zijn volledig opgeleid en gecertificeerd volgens de nieuwe normen.',
        publishedAt: new Date('2024-01-15').toISOString(),
        _status: 'published' as const,
      },
      {
        title: 'Duurzaam Slopen: Hoe Wij 98% Recycling Bereiken',
        content:
          'Duurzaamheid is niet langer een optie in de sloopindustrie - het is een vereiste. TitanBrekers leidt de weg met een indrukwekkend recyclingpercentage van 98%. Wij sorteren materialen direct op de slooplocatie in gespecialiseerde containers. Beton wordt vermalen tot granulaat voor nieuwe wegen, metaal wordt gescheiden en hergebruikt, en hout wordt verwerkt tot biomassa. Dit niet alleen bespaar kosten voor afvalverwerking, maar draagt ook bij aan een circulaire economie.',
        publishedAt: new Date('2024-02-08').toISOString(),
        _status: 'published' as const,
      },
      {
        title: 'Project Showcase: Innovatieve Sloop van Staalconstructie',
        content:
          'Vorige maand voltooiden we een complex project in de Rotterdamse haven: de demontage van een 50 meter hoge staalconstructie. Dit project toonde onze technische expertise aan. De constructie bevond zich naast operationele bedrijfsgebouwen, wat extreme precisie vereiste. Wij gebruikten geavanceerde 3D-scanning en precisiesnijsystemen om veilig te demonteren zonder de omliggende activiteiten te verstoren. Het project werd twee weken voor schema voltooid.',
        publishedAt: new Date('2024-03-20').toISOString(),
        _status: 'published' as const,
      },
      {
        title: 'Asbestsanering: Veiligheid Voorop',
        content:
          'Asbestsanering vereist gespecialiseerde kennis en uiterste voorzichtigheid. Bij TitanBrekers beschikken we over SC-530 certificering en jarenlange ervaring met veilige asbestverwijdering. Elk asbestproject begint met een gedetailleerde risicoanalyse. Onze gecertificeerde teams gebruiken volledig afgesloten werkruimtes, geavanceerde luchtfiltersystemen en persoonlijke beschermingsmiddelen. Wij documenteren elke stap van het proces.',
        publishedAt: new Date('2024-04-12').toISOString(),
        _status: 'published' as const,
      },
      {
        title: 'De Toekomst van Slopen: Digitalisering en Innovatie',
        content:
          'De sloopindustrie transformeert door digitalisering. TitanBrekers omarmt nieuwe technologieën om efficiënter, veiliger en duurzamer te werken. Wij gebruiken drones voor gebouwinspecties, 3D-BIM modellering voor planning, en geavanceerde sensoren voor monitoring van de sloopwerkzaamheden. Deze technologie stelt ons in staat om processen te optimaliseren en risicos te minimaliseren. Onze investering in digitale tools resulteert in kortere projecttijden.',
        publishedAt: new Date('2024-05-25').toISOString(),
        _status: 'published' as const,
      },
    ]

    for (const post of blogPosts) {
      await payload.create({
        collection: 'posts',
        data: post,
      })
    }

    console.log('✅ Blog posts seeded')

    console.log('🌱 Seeding Home Page...')

    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        hero: {
          title: 'KRACHT IN',
          subtitle: 'SLOOPWERK',
          description:
            'TitanBrekers is uw betrouwbare partner voor professioneel sloop- en demontagewerk. Met meer dan 25 jaar ervaring maken wij ruimte voor uw toekomst.',
          ctaButtons: [
            { text: 'Gratis Offerte', url: '/contact', style: 'primary' },
            { text: 'Bekijk Projecten', url: '/projecten', style: 'secondary' },
          ],
          stats: [
            { number: '25+', label: 'Jaar Ervaring' },
            { number: '500+', label: 'Projecten' },
            { number: '100%', label: 'Veilig' },
          ],
          features: [
            { icon: 'Clock', title: 'Snelle Respons', description: 'Binnen 24 uur reactie' },
            { icon: 'Shield', title: 'Volledig Verzekerd', description: 'Tot €5 miljoen dekking' },
            {
              icon: 'Award',
              title: 'VCA Gecertificeerd',
              description: 'Hoogste veiligheidsnormen',
            },
          ],
        },
      },
    })

    console.log('✅ Home page seeded')
    console.log('🎉 All data seeded successfully!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seed()
