import { getPayload } from 'payload'
import config from '../src/payload.config'

const seedBlogPosts = async () => {
  const payload = await getPayload({ config })

  const blogPosts = [
    {
      title: 'Nieuwe Veiligheidsnormen in de Sloopindustrie 2024',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'De sloopindustrie blijft evolueren, en 2024 brengt belangrijke wijzigingen in veiligheidsnormen. Bij TitanBrekers zijn we trots op het voldoen aan de nieuwste VCA-certificeringseisen.',
            },
          ],
        },
        {
          type: 'heading',
          children: [{ text: 'Belangrijkste Wijzigingen' }],
          tag: 'h2',
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'De meest significante veranderingen omvatten strengere eisen voor asbestsanering, verbeterde persoonlijke beschermingsmiddelen, en nieuwe protocollen voor werken op hoogte.',
            },
          ],
        },
      ],
      publishedAt: new Date('2024-01-15').toISOString(),
      _status: 'published' as const,
    },
    {
      title: 'Duurzaam Slopen: Hoe Wij 98% Recycling Bereiken',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Duurzaamheid is niet langer een optie in de sloopindustrie - het is een vereiste. TitanBrekers leidt de weg met een indrukwekkend recyclingpercentage van 98%.',
            },
          ],
        },
        {
          type: 'heading',
          children: [{ text: 'Onze Aanpak' }],
          tag: 'h2',
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'Wij sorteren materialen direct op de slooplocatie in gespecialiseerde containers. Beton wordt vermalen tot granulaat voor nieuwe wegen, metaal wordt gescheiden en hergebruikt, en hout wordt verwerkt tot biomassa.',
            },
          ],
        },
      ],
      publishedAt: new Date('2024-02-08').toISOString(),
      _status: 'published' as const,
    },
    {
      title: 'Project Showcase: Innovatieve Sloop van Staalconstructie',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Vorige maand voltooiden we een complex project in de Rotterdamse haven: de demontage van een 50 meter hoge staalconstructie. Dit project toonde onze technische expertise aan.',
            },
          ],
        },
        {
          type: 'heading',
          children: [{ text: 'Technische Uitdagingen' }],
          tag: 'h2',
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'De constructie bevond zich naast operationele bedrijfsgebouwen, wat extreme precisie vereiste. Wij gebruikten geavanceerde 3D-scanning en precisiesnijsystemen om veilig te demonteren zonder de omliggende activiteiten te verstoren.',
            },
          ],
        },
      ],
      publishedAt: new Date('2024-03-20').toISOString(),
      _status: 'published' as const,
    },
    {
      title: 'Asbestsanering: Veiligheid Voorop',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Asbestsanering vereist gespecialiseerde kennis en uiterste voorzichtigheid. Bij TitanBrekers beschikken we over SC-530 certificering en jarenlange ervaring met veilige asbestverwijdering.',
            },
          ],
        },
        {
          type: 'heading',
          children: [{ text: 'Onze Werkwijze' }],
          tag: 'h2',
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'Elk asbestproject begint met een gedetailleerde risicoanalyse. Onze gecertificeerde teams gebruiken volledig afgesloten werkruimtes, geavanceerde luchtfiltersystemen en persoonlijke beschermingsmiddelen.',
            },
          ],
        },
      ],
      publishedAt: new Date('2024-04-12').toISOString(),
      _status: 'published' as const,
    },
    {
      title: 'De Toekomst van Slopen: Digitalisering en Innovatie',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'De sloopindustrie transformeert door digitalisering. TitanBrekers omarmt nieuwe technologieën om efficiënter, veiliger en duurzamer te werken.',
            },
          ],
        },
        {
          type: 'heading',
          children: [{ text: 'Innovatieve Technologieën' }],
          tag: 'h2',
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'Wij gebruiken drones voor gebouwinspecties, 3D-BIM modellering voor planning, en geavanceerde sensoren voor monitoring van de sloopwerkzaamheden. Deze technologie stelt ons in staat om processen te optimaliseren en risicos te minimaliseren.',
            },
          ],
        },
      ],
      publishedAt: new Date('2024-05-25').toISOString(),
      _status: 'published' as const,
    },
  ]

  try {
    console.log('🌱 Seeding Blog Posts...')

    for (const post of blogPosts) {
      await payload.create({
        collection: 'posts',
        data: post,
      })
    }

    console.log('✅ Blog posts seeded')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error)
    process.exit(1)
  }
}

seedBlogPosts()
