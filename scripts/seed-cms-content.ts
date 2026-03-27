import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const { default: config } = await import(path.join(__dirname, '..', 'src', 'payload.config.ts'))

// Translation content for all locales
const aboutPageContent = {
  nl: {
    hero: {
      title: 'WIE ZIJN WIJ',
      description:
        'Al meer dan 25 jaar is TitanBrekers dé specialist in professioneel sloopwerk. Met passie, vakmanschap en moderne apparatuur maken wij ruimte voor de toekomst.',
    },
    story: {
      title: 'ONS VERHAAL',
      paragraphs: [
        {
          text: 'TitanBrekers werd in 1999 opgericht door twee ervaren slopers met een duidelijke missie: professioneel sloopwerk leveren met oog voor veiligheid, kwaliteit en milieu.',
        },
        {
          text: 'Wat begon als een klein familiebedrijf is uitgegroeid tot een van de meest gerespecteerde sloopbedrijven van Nederland. Met meer dan 50 medewerkers, een modern machinepark en alle benodigde certificeringen pakken wij elk project aan - groot of klein.',
        },
        {
          text: 'Onze kracht zit in ons team. Ervaren vakmensen die trots zijn op hun werk en altijd streven naar het beste resultaat. Samen met onze opdrachtgevers vinden wij oplossingen voor de meest complexe sloopprojecten.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Jaar Ervaring' },
      { number: '500+', label: 'Projecten' },
      { number: '50+', label: 'Medewerkers' },
      { number: '98%', label: 'Recycling' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Veiligheid',
        description:
          'Veiligheid staat altijd voorop. Wij werken volgens VCA** en hanteren de hoogste veiligheidsnormen op al onze projecten.',
      },
      {
        icon: 'Target',
        title: 'Kwaliteit',
        description:
          'Wij leveren kwaliteitswerk, op tijd en binnen budget. Onze klanten kunnen rekenen op professionele uitvoering.',
      },
      {
        icon: 'Heart',
        title: 'Duurzaamheid',
        description:
          'Met 98% recycling van sloopafval dragen wij bij aan een circulaire economie en een schonere toekomst.',
      },
      {
        icon: 'Users',
        title: 'Vakmanschap',
        description:
          'Ons team bestaat uit ervaren vakmensen die trots zijn op hun werk en altijd streven naar het beste resultaat.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Oprichting',
        description: 'TitanBrekers wordt opgericht in Rotterdam',
      },
      { year: '2005', title: 'VCA Certificering', description: 'Behalen van VCA** certificering' },
      { year: '2010', title: 'SC-530 Erkenning', description: 'Erkenning voor asbestverwijdering' },
      { year: '2015', title: 'Landelijke Dekking', description: 'Uitbreiding naar heel Nederland' },
      { year: '2020', title: '50 Medewerkers', description: 'Groei naar 50+ vakmensen' },
      {
        year: '2024',
        title: '500+ Projecten',
        description: 'Mijlpaal van 500 succesvolle projecten',
      },
    ],
  },
  en: {
    hero: {
      title: 'WHO WE ARE',
      description:
        'For more than 25 years, TitanBreakers has been the specialist in professional demolition work. With passion, craftsmanship, and modern equipment, we make room for the future.',
    },
    story: {
      title: 'OUR STORY',
      paragraphs: [
        {
          text: 'TitanBreakers was founded in 1999 by two experienced demolition workers with a clear mission: to deliver professional demolition work with attention to safety, quality, and environment.',
        },
        {
          text: 'What started as a small family business has grown into one of the most respected demolition companies in the Netherlands. With more than 50 employees, a modern fleet of equipment, and all necessary certifications, we tackle every project - big or small.',
        },
        {
          text: 'Our strength lies in our team. Experienced professionals who are proud of their work and always strive for the best results. Together with our clients, we find solutions for the most complex demolition projects.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Years Experience' },
      { number: '500+', label: 'Projects' },
      { number: '50+', label: 'Employees' },
      { number: '98%', label: 'Recycling' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Safety',
        description:
          'Safety always comes first. We work according to VCA** and maintain the highest safety standards on all our projects.',
      },
      {
        icon: 'Target',
        title: 'Quality',
        description:
          'We deliver quality work, on time and within budget. Our clients can count on professional execution.',
      },
      {
        icon: 'Heart',
        title: 'Sustainability',
        description:
          'With 98% recycling of demolition waste, we contribute to a circular economy and a cleaner future.',
      },
      {
        icon: 'Users',
        title: 'Craftsmanship',
        description:
          'Our team consists of experienced professionals who are proud of their work and always strive for the best results.',
      },
    ],
    timeline: [
      { year: '1999', title: 'Foundation', description: 'TitanBreakers is founded in Rotterdam' },
      { year: '2005', title: 'VCA Certification', description: 'Achieving VCA** certification' },
      {
        year: '2010',
        title: 'SC-530 Recognition',
        description: 'Recognition for asbestos removal',
      },
      {
        year: '2015',
        title: 'National Coverage',
        description: 'Expansion throughout the Netherlands',
      },
      { year: '2020', title: '50 Employees', description: 'Growth to 50+ professionals' },
      { year: '2024', title: '500+ Projects', description: 'Milestone of 500 successful projects' },
    ],
  },
  fr: {
    hero: {
      title: 'QUI SOMMES-NOUS',
      description:
        "Depuis plus de 25 ans, TitanFracteurs est le spécialiste des travaux de démolition professionnels. Avec passion, savoir-faire et équipement moderne, nous faisons de la place pour l'avenir.",
    },
    story: {
      title: 'NOTRE HISTOIRE',
      paragraphs: [
        {
          text: "TitanFracteurs a été fondé en 1999 par deux démolisseurs expérimentés avec une mission claire: fournir des travaux de démolition professionnels avec attention à la sécurité, la qualité et l'environnement.",
        },
        {
          text: "Ce qui a commencé comme une petite entreprise familiale est devenu l'une des entreprises de démolition les plus respectées aux Pays-Bas. Avec plus de 50 employés, un parc de machines moderne et toutes les certifications nécessaires, nous abordons chaque projet - grand ou petit.",
        },
        {
          text: 'Notre force réside dans notre équipe. Des professionnels expérimentés qui sont fiers de leur travail et visent toujours les meilleurs résultats. Ensemble avec nos clients, nous trouvons des solutions pour les projets de démolition les plus complexes.',
        },
      ],
    },
    stats: [
      { number: '25+', label: "Années d'Expérience" },
      { number: '500+', label: 'Projets' },
      { number: '50+', label: 'Employés' },
      { number: '98%', label: 'Recyclage' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Sécurité',
        description:
          'La sécurité est toujours la priorité. Nous travaillons selon VCA** et maintenons les normes de sécurité les plus élevées sur tous nos projets.',
      },
      {
        icon: 'Target',
        title: 'Qualité',
        description:
          'Nous livrons des travaux de qualité, dans les délais et dans le budget. Nos clients peuvent compter sur une exécution professionnelle.',
      },
      {
        icon: 'Heart',
        title: 'Durabilité',
        description:
          'Avec 98% de recyclage des déchets de démolition, nous contribuons à une économie circulaire et à un avenir plus propre.',
      },
      {
        icon: 'Users',
        title: 'Savoir-faire',
        description:
          'Notre équipe est composée de professionnels expérimentés qui sont fiers de leur travail et visent toujours les meilleurs résultats.',
      },
    ],
    timeline: [
      { year: '1999', title: 'Fondation', description: 'TitanFracteurs est fondé à Rotterdam' },
      {
        year: '2005',
        title: 'Certification VCA',
        description: 'Obtention de la certification VCA**',
      },
      {
        year: '2010',
        title: 'Reconnaissance SC-530',
        description: 'Reconnaissance pour le désamiantage',
      },
      {
        year: '2015',
        title: 'Couverture Nationale',
        description: "Extension à l'ensemble des Pays-Bas",
      },
      { year: '2020', title: '50 Employés', description: 'Croissance à plus de 50 professionnels' },
      { year: '2024', title: '500+ Projets', description: 'Jalon de 500 projets réussis' },
    ],
  },
  de: {
    hero: {
      title: 'WER WIR SIND',
      description:
        'Seit über 25 Jahren ist TitanBrecher die Spezialistin für professionelle Abbrucharbeiten. Mit Leidenschaft, Handwerkskunst und moderner Ausrüstung schaffen wir Raum für die Zukunft.',
    },
    story: {
      title: 'UNSERE GESCHICHTE',
      paragraphs: [
        {
          text: 'TitanBrecher wurde 1999 von zwei erfahrenen Abbruchfachleuten mit einer klaren Mission gegründet: professionelle Abbrucharbeiten mit Augenmerk auf Sicherheit, Qualität und Umwelt.',
        },
        {
          text: 'Was als kleines Familienunternehmen begann, ist zu einem der angesehensten Abbruchunternehmen der Niederlande gewachsen. Mit mehr als 50 Mitarbeitern, einem modernen Maschinenpark und allen notwendigen Zertifizierungen meistern wir jedes Projekt - groß oder klein.',
        },
        {
          text: 'Unsere Stärke liegt in unserem Team. Erfahrene Fachleute, die stolz auf ihre Arbeit sind und immer das beste Ergebnis anstreben. Zusammen mit unseren Auftraggebern finden wir Lösungen für die komplexesten Abbruchprojekte.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Jahre Erfahrung' },
      { number: '500+', label: 'Projekte' },
      { number: '50+', label: 'Mitarbeiter' },
      { number: '98%', label: 'Recycling' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Sicherheit',
        description:
          'Sicherheit steht immer an erster Stelle. Wir arbeiten nach VCA** und halten die höchsten Sicherheitsstandards auf allen unseren Projekten ein.',
      },
      {
        icon: 'Target',
        title: 'Qualität',
        description:
          'Wir liefern Qualitätsarbeit, pünktlich und im Budget. Unsere Kunden können sich auf professionelle Ausführung verlassen.',
      },
      {
        icon: 'Heart',
        title: 'Nachhaltigkeit',
        description:
          'Mit 98% Recycling von Abbruchabfällen tragen wir zu einer Kreislaufwirtschaft und einer saubereren Zukunft bei.',
      },
      {
        icon: 'Users',
        title: 'Handwerkskunst',
        description:
          'Unser Team besteht aus erfahrenen Fachleuten, die stolz auf ihre Arbeit sind und immer das beste Ergebnis anstreben.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Gründung',
        description: 'TitanBrecher wird in Rotterdam gegründet',
      },
      {
        year: '2005',
        title: 'VCA Zertifizierung',
        description: 'Erreichung der VCA** Zertifizierung',
      },
      {
        year: '2010',
        title: 'SC-530 Anerkennung',
        description: 'Anerkennung für Asbestentfernung',
      },
      {
        year: '2015',
        title: 'Nationale Abdeckung',
        description: 'Expansion in die ganzen Niederlande',
      },
      { year: '2020', title: '50 Mitarbeiter', description: 'Wachstum auf über 50 Fachleute' },
      {
        year: '2024',
        title: '500+ Projekte',
        description: 'Meilenstein von 500 erfolgreichen Projekten',
      },
    ],
  },
  it: {
    hero: {
      title: 'CHI SIAMO',
      description:
        'Da oltre 25 anni, TitanDemolitores è lo specialista dei lavori di demolizione professionale. Con passione, artigianato ed equipaggiamento moderno, creiamo spazio per il futuro.',
    },
    story: {
      title: 'LA NOSTRA STORIA',
      paragraphs: [
        {
          text: 'TitanDemolitores è stata fondata nel 1999 da due esperti demolitori con una chiara missione: fornire lavori di demolizione professionale con attenzione alla sicurezza, qualità e ambiente.',
        },
        {
          text: 'Ciò che iniziò come una piccola azienda familiare è cresciuta fino a diventare una delle imprese di demolizione più rispettate dei Paesi Bassi. Con oltre 50 dipendenti, un parco macchine moderno e tutte le certificazioni necessarie, affrontiamo ogni progetto - grande o piccolo.',
        },
        {
          text: 'La nostra forza risiede nel nostro team. Professionisti esperti che sono orgogliosi del loro lavoro e mirano sempre ai migliori risultati. Insieme ai nostri clienti, troviamo soluzioni per i progetti di demolizione più complessi.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Anni di Esperienza' },
      { number: '500+', label: 'Progetti' },
      { number: '50+', label: 'Dipendenti' },
      { number: '98%', label: 'Riciclaggio' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Sicurezza',
        description:
          'La sicurezza viene sempre prima di tutto. Lavoriamo secondo VCA** e manteniamo gli standard di sicurezza più elevati in tutti i nostri progetti.',
      },
      {
        icon: 'Target',
        title: 'Qualità',
        description:
          "Forniamo lavori di qualità, in orario e nel budget. I nostri clienti possono contare su un'esecuzione professionale.",
      },
      {
        icon: 'Heart',
        title: 'Sostenibilità',
        description:
          'Con il 98% di riciclo dei rifiuti di demolizione, contribuiamo a un economia circolare e a un futuro più pulito.',
      },
      {
        icon: 'Users',
        title: 'Artigianato',
        description:
          'Il nostro team è composto da professionisti esperti che sono orgogliosi del loro lavoro e mirano sempre ai migliori risultati.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Fondazione',
        description: 'TitanDemolitores viene fondata a Rotterdam',
      },
      {
        year: '2005',
        title: 'Certificazione VCA',
        description: 'Conseguimento della certificazione VCA**',
      },
      {
        year: '2010',
        title: 'Riconoscimento SC-530',
        description: 'Riconoscimento per la rimozione del amianto',
      },
      {
        year: '2015',
        title: 'Copertura Nazionale',
        description: 'Espansione in tutti i Paesi Bassi',
      },
      { year: '2020', title: '50 Dipendenti', description: 'Crescita a oltre 50 professionisti' },
      {
        year: '2024',
        title: '500+ Progetti',
        description: 'Traguardo di 500 progetti riusciti',
      },
    ],
  },
  es: {
    hero: {
      title: 'QUIÉNES SOMOS',
      description:
        'Desde hace más de 25 años, TitanDemoledores es el especialista en trabajos de demolición profesionales. Con pasión, artesanía y equipamiento moderno, hacemos espacio para el futuro.',
    },
    story: {
      title: 'NUESTRA HISTORIA',
      paragraphs: [
        {
          text: 'TitanDemoledores fue fundada en 1999 por dos demolidores experimentados con una clara misión: ofrecer trabajos de demolición profesionales con atención a la seguridad, calidad y medio ambiente.',
        },
        {
          text: 'Lo que comenzó como una pequeña empresa familiar ha crecido hasta convertirse en una de las empresas de demolición más respetadas de los Países Bajos. Con más de 50 empleados, un parque de maquinaria moderno y todas las certificaciones necesarias, abordamos cada proyecto - grande o pequeño.',
        },
        {
          text: 'Nuestra fortaleza reside en nuestro equipo. Profesionales experimentados que están orgullosos de su trabajo y siempre aspiran a los mejores resultados. Junto con nuestros clientes, encontramos soluciones para los proyectos de demolición más complejos.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Años de Experiencia' },
      { number: '500+', label: 'Proyectos' },
      { number: '50+', label: 'Empleados' },
      { number: '98%', label: 'Reciclaje' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Seguridad',
        description:
          'La seguridad siempre es lo primero. Trabajamos según VCA** y mantenemos los más altos estándares de seguridad en todos nuestros proyectos.',
      },
      {
        icon: 'Target',
        title: 'Calidad',
        description:
          'Entregamos trabajo de calidad, a tiempo y dentro del presupuesto. Nuestros clientes pueden contar con una ejecución profesional.',
      },
      {
        icon: 'Heart',
        title: 'Sostenibilidad',
        description:
          'Con el 98% de reciclaje de residuos de demolición, contribuimos a una economía circular y a un futuro más limpio.',
      },
      {
        icon: 'Users',
        title: 'Artesanía',
        description:
          'Nuestro equipo está formado por profesionales experimentados que están orgullosos de su trabajo y siempre aspiran a los mejores resultados.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Fundación',
        description: 'TitanDemoledores se funda en Róterdam',
      },
      {
        year: '2005',
        title: 'Certificación VCA',
        description: 'Obtención de la certificación VCA**',
      },
      {
        year: '2010',
        title: 'Reconocimiento SC-530',
        description: 'Reconocimiento para la retirada de amianto',
      },
      {
        year: '2015',
        title: 'Cobertura Nacional',
        description: 'Expansión a todos los Países Bajos',
      },
      { year: '2020', title: '50 Empleados', description: 'Crecimiento a más de 50 profesionales' },
      {
        year: '2024',
        title: '500+ Proyectos',
        description: 'Hito de 500 proyectos exitosos',
      },
    ],
  },
  sv: {
    hero: {
      title: 'VILKA VI ÄR',
      description:
        'I mer än 25 år har TitanBrytare varit specialisten på professionellt rivningsarbete. Med passion, hantverk och modern utrustning skapar vi utrymme för framtiden.',
    },
    story: {
      title: 'VÅR HISTORIA',
      paragraphs: [
        {
          text: 'TitanBrytare grundades 1999 av två erfarna rivningsarbetare med ett tydligt uppdrag: att leverera professionellt rivningsarbete med fokus på säkerhet, kvalitet och miljö.',
        },
        {
          text: 'Det som började som ett litet familjeföretag har vuxit till ett av de mest respekterade rivningsföretagen i Nederländerna. Med mer än 50 anställda, en modern maskinpark och alla nödvändiga certifieringar tar vi oss an varje projekt - stort eller litet.',
        },
        {
          text: 'Vår styrka ligger i vårt team. Erfarna yrkesmän som är stolta över sitt arbete och alltid strävar efter de bästa resultaten. Tillsammans med våra kunder hittar vi lösningar för de mest komplexa rivningsprojekten.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Års Erfarenhet' },
      { number: '500+', label: 'Projekt' },
      { number: '50+', label: 'Anställda' },
      { number: '98%', label: 'Återvinning' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Säkerhet',
        description:
          'Säkerhet kommer alltid först. Vi arbetar enligt VCA** och upprätthåller de högsta säkerhetsstandarderna på alla våra projekt.',
      },
      {
        icon: 'Target',
        title: 'Kvalitet',
        description:
          'Vi levererar kvalitetsarbete i tid och inom budget. Våra kunder kan räkna med professionellt utförande.',
      },
      {
        icon: 'Heart',
        title: 'Hållbarhet',
        description:
          'Med 98% återvinning av rivningsavfall bidrar vi till en cirkulär ekonomi och en renare framtid.',
      },
      {
        icon: 'Users',
        title: 'Hantverk',
        description:
          'Vårt team består av erfarna yrkesmän som är stolta över sitt arbete och alltid strävar efter de bästa resultaten.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Grundande',
        description: 'TitanBrytare grundas i Rotterdam',
      },
      { year: '2005', title: 'VCA Certifiering', description: 'Uppnående av VCA** certifiering' },
      { year: '2010', title: 'SC-530 Erkännande', description: 'Erkännande för asbetsborttagning' },
      {
        year: '2015',
        title: 'Nationell Täckning',
        description: 'Expansion över hela Nederländerna',
      },
      { year: '2020', title: '50 Anställda', description: 'Tillväxt till över 50 yrkesmän' },
      {
        year: '2024',
        title: '500+ Projekt',
        description: 'Milstolpe av 500 framgångsrika projekt',
      },
    ],
  },
  fi: {
    hero: {
      title: 'KEITÄ ME OLEMME',
      description:
        'Yli 25 vuoden ajan TitanMurtajat on ollut ammattimaisen purkutyön asiantuntija. Intohimolla, käsityötaidoilla ja moderneilla laitteilla luomme tilaa tulevaisuudelle.',
    },
    story: {
      title: 'MEIDÄN TARINAMME',
      paragraphs: [
        {
          text: 'TitanMurtajat perustettiin vuonna 1999 kahden kokeneen purkutyöntekijän toimesta selkeällä missionilla: toimittaa ammattimainen purkutyö huomioiden turvallisuus, laatu ja ympäristö.',
        },
        {
          text: 'Se, mikä alkoi pienenä perheyrityksenä, on kasvanut yhdeksi Alankomaiden arvostetuimmista purkuyrityksistä. Yli 50 työntekijällä, modernilla kalustolla ja kaikilla tarvittavilla sertifikaateilla toteutamme jokaisen projektin - suuren tai pienen.',
        },
        {
          text: 'Vahvuutemme on tiimissämme. Kokeneita ammattilaisia, jotka ovat ylpeitä työstään ja pyrkivät aina parhaisiin tuloksiin. Yhdessä asiakkaidemme kanssa löydämme ratkaisuja monimutkaisimpiinkin purkuprojekteihin.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Vuoden Kokemus' },
      { number: '500+', label: 'Projektit' },
      { number: '50+', label: 'Työntekijät' },
      { number: '98%', label: 'Kierrätys' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Turvallisuus',
        description:
          'Turvallisuus on aina etusijalla. Toimimme VCA** standardien mukaisesti ja ylläpidämme korkeimpia turvallisuusstandardeja kaikissa projekteissamme.',
      },
      {
        icon: 'Target',
        title: 'Laatu',
        description:
          'Toimitamme laadukasta työtä ajoissa ja budjetissa. Asiakkaamme voivat luotella ammattimaiseen toteutukseen.',
      },
      {
        icon: 'Heart',
        title: 'Kestävyys',
        description:
          '98% kierrätysasteella purkujätteestä edistämme kiertotaloutta ja puhtaampaa tulevaisuutta.',
      },
      {
        icon: 'Users',
        title: 'Käsityötaito',
        description:
          'Tiimimme koostuu kokeneista ammattilaisista, jotka ovat ylpeitä työstään ja pyrkivät aina parhaisiin tuloksiin.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Perustaminen',
        description: 'TitanMurtajat perustetaan Rotterdamiin',
      },
      { year: '2005', title: 'VCA Sertifiointi', description: 'VCA** sertifikaatin saavuttaminen' },
      { year: '2010', title: 'SC-530 Tunnustus', description: 'Tunnustus asbestin poistamiseen' },
      {
        year: '2015',
        title: 'Valtakunnallinen Kattavuus',
        description: 'Laajentuminen koko Alankomaihin',
      },
      { year: '2020', title: '50 Työntekijää', description: 'Kasvu yli 50 ammattilaiseen' },
      {
        year: '2024',
        title: '500+ Projektia',
        description: '500 onnistuneen projektin merkkipaalu',
      },
    ],
  },
  pl: {
    hero: {
      title: 'KIM JESTEŚMY',
      description:
        'Od ponad 25 lat TitanBurzyciele jest specjalistą w profesjonalnych pracach rozbiórkowych. Z pasją, rzemiosłem i nowoczesnym sprzętem tworzymy przestrzeń dla przyszłości.',
    },
    story: {
      title: 'NASZA HISTORIA',
      paragraphs: [
        {
          text: 'TitanBurzyciele został założony w 1999 roku przez dwóch doświadczonych robotników rozbiórkowych z jasną misją: świadczenie profesjonalnych usług rozbiórkowych z naciskiem na bezpieczeństwo, jakość i środowisko.',
        },
        {
          text: 'To, co zaczęło się jako mała firma rodzinna, rozrosło się do jednej z najbardziej szanowanych firm rozbiórkowych w Holandii. Z ponad 50 pracownikami, nowoczesnym parkiem maszynowym i wszystkimi wymaganymi certyfikatami, podejmujemy się każdego projektu - dużego czy małego.',
        },
        {
          text: 'Nasza siła tkwi w naszym zespole. Doświadczeni profesjonaliści, którzy są dumni ze swojej pracy i zawsze dążą do najlepszych wyników. Wspólnie z naszymi klientami znajdujemy rozwiązania dla najbardziej złożonych projektów rozbiórkowych.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Lat Doświadczenia' },
      { number: '500+', label: 'Projektów' },
      { number: '50+', label: 'Pracowników' },
      { number: '98%', label: 'Recykling' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Bezpieczeństwo',
        description:
          'Bezpieczeństwo jest zawsze na pierwszym miejscu. Pracujemy zgodnie z VCA** i utrzymujemy najwyższe standardy bezpieczeństwa we wszystkich naszych projektach.',
      },
      {
        icon: 'Target',
        title: 'Jakość',
        description:
          'Dostarczamy pracę najwyższej jakości, na czas i w budżecie. Nasi klienci mogą liczyć na profesjonalne wykonanie.',
      },
      {
        icon: 'Heart',
        title: 'Zrównoważony Rozwój',
        description:
          'Z 98% recyklingiem odpadów rozbiórkowych przyczyniamy się do gospodarki o obiegu zamkniętym i czystszej przyszłości.',
      },
      {
        icon: 'Users',
        title: 'Rzemiosło',
        description:
          'Nasz zespół składa się z doświadczonych profesjonalistów, którzy są dumni ze swojej pracy i zawsze dążą do najlepszych wyników.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Założenie',
        description: 'TitanBurzyciele zostaje założony w Rotterdamie',
      },
      { year: '2005', title: 'Certyfikacja VCA', description: 'Uzyskanie certyfikacji VCA**' },
      { year: '2010', title: 'Uznanie SC-530', description: 'Uznanie dla usuwania azbestu' },
      { year: '2015', title: 'Ogólnokrajowe Pokrycie', description: 'Ekspansja na całe Holandię' },
      { year: '2020', title: '50 Pracowników', description: 'Wzrost do ponad 50 profesjonalistów' },
      {
        year: '2024',
        title: '500+ Projektów',
        description: 'Kamień milowy 500 ukończonych projektów',
      },
    ],
  },
  ar: {
    hero: {
      title: 'من نحن',
      description:
        'منذ أكثر من 25 عامًا، كانت تيتان بريكرز المتخصصة في أعمال الهدم المهنية. مع الشغف والحرفية والمعدات الحديثة، نخلق مساحة للمستقبل.',
    },
    story: {
      title: 'قصتنا',
      paragraphs: [
        {
          text: 'تأسست تيتان بريكرز في عام 1999 على يد عاملي هدم متمرسين بمهمة واضحة: تقديم أعمال هدم مهنية مع التركيز على السلامة والجودة والبيئة.',
        },
        {
          text: 'ما بدأ كشركة عائلية صغيرة نمت لتصبح واحدة من أكثر شركات الهدم احترامًا في هولندا. مع أكثر من 50 موظفًا، ومعدات حديثة، وجميع الشهادات اللازمة، نتعامل مع كل مشروع - كبير أو صغير.',
        },
        {
          text: 'قوتنا تكمن في فريقنا. محترفون متمرسون يفخرون بعملهم ويسعون دائمًا لتحقيق أفضل النتائج. جنبًا إلى جنب مع عملائنا، نجد حلولًا لأكثر مشاريع الهدم تعقيدًا.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'سنوات الخبرة' },
      { number: '500+', label: 'المشاريع' },
      { number: '50+', label: 'الموظفين' },
      { number: '98%', label: 'إعادة التدوير' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'السلامة',
        description:
          'السلامة دائمًا في المقام الأول. نحن نعمل وفقًا لمعايير VCA** ونحافظ على أعلى معايير السلامة في جميع مشاريعنا.',
      },
      {
        icon: 'Target',
        title: 'الجودة',
        description:
          'نقدم عملاً عالي الجودة، في الوقت المحدد وضمن الميزانية. يمكن لعملائنا الاعتماد على التنفيذ المهني.',
      },
      {
        icon: 'Heart',
        title: 'الاستدامة',
        description: 'مع 98% من إعادة تدوير مخلفات الهدم، نساهم في الاقتصاد الدائري ومستقبل أنظف.',
      },
      {
        icon: 'Users',
        title: 'الحرفية',
        description:
          'يتكون فريقنا من محترفين متمرسين يفخرون بعملهم ويسعون دائمًا لتحقيق أفضل النتائج.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'التأسيس',
        description: 'تيتان بريكرز تأسست في روتردام',
      },
      { year: '2005', title: 'شهادة VCA', description: 'الحصول على شهادة VCA**' },
      { year: '2010', title: 'اعتراف SC-530', description: 'اعتراف بإزالة الأسبستوس' },
      { year: '2015', title: 'التغطية الوطنية', description: 'التوسع في جميع أنحاء هولندا' },
      { year: '2020', title: '50 موظفًا', description: 'النمو إلى أكثر من 50 محترفًا' },
      {
        year: '2024',
        title: '500+ مشروع',
        description: 'علامة فارقة 500 مشروع ناجح',
      },
    ],
  },
  zh: {
    hero: {
      title: '我们是谁',
      description:
        '25年多以来，泰坦拆除一直是专业拆除工程领域的专家。凭借热情、工艺和现代化设备，我们为未来创造空间。',
    },
    story: {
      title: '我们的故事',
      paragraphs: [
        {
          text: '泰坦拆除由两位经验丰富的拆除工人于1999年创立，使命明确：提供专业的拆除工程，注重安全、质量和环境。',
        },
        {
          text: '这个起步于小型家族企业的公司，已成长为荷兰最受尊敬的拆除公司之一。拥有50多名员工、现代化的机械设备和所有必要的认证，我们承接每一个项目——无论大小。',
        },
        {
          text: '我们的力量在于我们的团队。经验丰富的专业人士，他们为自己的工作感到自豪，始终追求最佳结果。与客户一起，我们找到最复杂拆除项目的解决方案。',
        },
      ],
    },
    stats: [
      { number: '25+', label: '年经验' },
      { number: '500+', label: '项目' },
      { number: '50+', label: '员工' },
      { number: '98%', label: '回收' },
    ],
    values: [
      {
        icon: 'Shield',
        title: '安全',
        description: '安全永远是第一位的。我们按照VCA**工作，并在所有项目中保持最高的安全标准。',
      },
      {
        icon: 'Target',
        title: '质量',
        description: '我们按时、按预算交付高质量的工作。我们的客户可以信赖专业的执行。',
      },
      {
        icon: 'Heart',
        title: '可持续性',
        description: '通过98%的拆除废料回收，我们为循环经济和更清洁的未来做出贡献。',
      },
      {
        icon: 'Users',
        title: '工艺',
        description:
          '我们的团队由经验丰富的专业人士组成，他们为自己的工作感到自豪，始终追求最佳结果。',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: '成立',
        description: '泰坦拆除在鹿特丹成立',
      },
      { year: '2005', title: 'VCA认证', description: '获得VCA**认证' },
      { year: '2010', title: 'SC-530认可', description: '石棉清除认可' },
      { year: '2015', title: '全国覆盖', description: '扩展到整个荷兰' },
      { year: '2020', title: '50名员工', description: '发展到50多名专业人员' },
      {
        year: '2024',
        title: '500+项目',
        description: '500个成功项目的里程碑',
      },
    ],
  },
  ja: {
    hero: {
      title: '私たちについて',
      description:
        '25年以上にわたり、タイタンブレーカーズは専門的な解体工事のスペシャリストです。情熱、職人技、そして最新の設備で、未来のための空間を創造します。',
    },
    story: {
      title: '私たちの物語',
      paragraphs: [
        {
          text: 'タイタンブレーカーズは1999年、2人の熟練した解体作業員によって明確な使命を持って設立されました：安全、品質、環境に配慮しながら専門的な解体工事を提供すること。',
        },
        {
          text: '小さな家族経営として始まった当社は、オランダで最も尊敬される解体会社の一つに成長しました。50名以上の社員、最新の機械設備、必要な認証をすべて持ち、大小問わずあらゆるプロジェクトに対応します。',
        },
        {
          text: '私たちの強みはチームにあります。自分たちの仕事に誇りを持ち、常に最高の結果を追求する経験豊富な専門家たちです。お客様と共に、最も複雑な解体プロジェクトの解決策を見つけます。',
        },
      ],
    },
    stats: [
      { number: '25+', label: '年の経験' },
      { number: '500+', label: 'プロジェクト' },
      { number: '50+', label: '従業員' },
      { number: '98%', label: 'リサイクル' },
    ],
    values: [
      {
        icon: 'Shield',
        title: '安全',
        description:
          '安全は常に最優先です。VCA**に準拠し、すべてのプロジェクトで最高の安全基準を維持しています。',
      },
      {
        icon: 'Target',
        title: '品質',
        description:
          '期限内かつ予算内で最高品質の作業を納品します。お客様はプロフェッショナルな対応を期待できます。',
      },
      {
        icon: 'Heart',
        title: '持続可能性',
        description: '解体廃棄物の98%をリサイクルし、循環型経済とより清潔な未来に貢献しています。',
      },
      {
        icon: 'Users',
        title: '職人技',
        description:
          '私たちのチームは、自分たちの仕事に誇りを持ち、常に最高の結果を追求する経験豊富な専門家で構成されています。',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: '設立',
        description: 'タイタンブレーカーズがロッテルダムで設立',
      },
      { year: '2005', title: 'VCA認証', description: 'VCA**認証の取得' },
      { year: '2010', title: 'SC-530認定', description: 'アスベスト除去の認定' },
      { year: '2015', title: '全国展開', description: 'オランダ全国への展開' },
      { year: '2020', title: '50名の社員', description: '50名以上の専門家への成長' },
      {
        year: '2024',
        title: '500件以上のプロジェクト',
        description: '500件の成功したプロジェクトという節目',
      },
    ],
  },
  pt: {
    hero: {
      title: 'QUEM SOMOS',
      description:
        'Há mais de 25 anos, a TitanDemolidores é a especialista em trabalhos de demolição profissionais. Com paixão, artesanato e equipamento moderno, criamos espaço para o futuro.',
    },
    story: {
      title: 'A NOSSA HISTÓRIA',
      paragraphs: [
        {
          text: 'A TitanDemolidores foi fundada em 1999 por dois demolidores experientes com uma missão clara: fornecer trabalhos de demolição profissionais com atenção à segurança, qualidade e ambiente.',
        },
        {
          text: 'O que começou como uma pequena empresa familiar tornou-se uma das empresas de demolição mais respeitadas dos Países Baixos. Com mais de 50 funcionários, uma frota de equipamentos moderna e todas as certificações necessárias, enfrentamos cada projeto - grande ou pequeno.',
        },
        {
          text: 'A nossa força reside na nossa equipa. Profissionais experientes que têm orgulho no seu trabalho e que sempre visam os melhores resultados. Juntamente com os nossos clientes, encontramos soluções para os projetos de demolição mais complexos.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Anos de Experiência' },
      { number: '500+', label: 'Projetos' },
      { number: '50+', label: 'Funcionários' },
      { number: '98%', label: 'Reciclagem' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Segurança',
        description:
          'A segurança é sempre a prioridade. Trabalhamos segundo VCA** e mantemos os mais altos padrões de segurança em todos os nossos projetos.',
      },
      {
        icon: 'Target',
        title: 'Qualidade',
        description:
          'Entregamos trabalho de qualidade, no prazo e dentro do orçamento. Os nossos clientes podem contar com uma execução profissional.',
      },
      {
        icon: 'Heart',
        title: 'Sustentabilidade',
        description:
          'Com 98% de reciclagem de resíduos de demolição, contribuímos para uma economia circular e um futuro mais limpo.',
      },
      {
        icon: 'Users',
        title: 'Artesanato',
        description:
          'A nossa equipa é composta por profissionais experientes que têm orgulho no seu trabalho e que sempre visam os melhores resultados.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Fundação',
        description: 'TitanDemolidores é fundada em Roterdã',
      },
      { year: '2005', title: 'Certificação VCA', description: 'Obtenção da certificação VCA**' },
      {
        year: '2010',
        title: 'Reconhecimento SC-530',
        description: 'Reconhecimento para remoção de amianto',
      },
      {
        year: '2015',
        title: 'Cobertura Nacional',
        description: 'Expansão por todos os Países Baixos',
      },
      {
        year: '2020',
        title: '50 Funcionários',
        description: 'Crescimento para mais de 50 profissionais',
      },
      {
        year: '2024',
        title: '500+ Projetos',
        description: 'Marco de 500 projetos bem-sucedidos',
      },
    ],
  },
  tr: {
    hero: {
      title: 'BİZ KİMİZ',
      description:
        '25 yılı aşkın süredir TitanYıkıcılar profesyonel yıkım işlerinin uzmanıdır. Tutku, ustalık ve modern ekipmanla gelecek için alan yaratıyoruz.',
    },
    story: {
      title: 'HİKAYEMİZ',
      paragraphs: [
        {
          text: 'TitanYıkıcılar, 1999 yılında iki deneyimli yıkım işçisi tarafından açık bir misyonla kuruldu: güvenlik, kalite ve çevreye dikkat ederek profesyonel yıkım işleri sunmak.',
        },
        {
          text: 'Küçük bir aile işletmesi olarak başlayan şirket, Hollandanın en saygın yıkım şirketlerinden biri haline geldi. 50den fazla çalışan, modern makine parkı ve gerekli tüm sertifikasyonlarla her projeyi ele alıyoruz - büyük veya küçük.',
        },
        {
          text: 'Gücümüz ekibimizde yatıyor. İşleriyle gurur duyan ve her zaman en iyi sonuçları hedefleyen deneyimli profesyoneller. Müşterilerimizle birlikte en karmaşık yıkım projeleri için çözümler buluyoruz.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Yıllık Deneyim' },
      { number: '500+', label: 'Projeler' },
      { number: '50+', label: 'Çalışanlar' },
      { number: '98%', label: 'Geri Dönüşüm' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Güvenlik',
        description:
          'Güvenlik her zaman ilk sırada gelir. VCA**ye göre çalışıyoruz ve tüm projelerimizde en yüksek güvenlik standartlarını koruyoruz.',
      },
      {
        icon: 'Target',
        title: 'Kalite',
        description:
          'Zamanında ve bütçe dahilinde kaliteli iş teslim ediyoruz. Müşterilerimiz profesyonel uygulamaya güvenebilir.',
      },
      {
        icon: 'Heart',
        title: 'Sürdürülebilirlik',
        description:
          'Yıkım atıklarının %98ini geri dönüştürerek dolaşım ekonomisine ve daha temiz bir geleceğe katkıda bulunuyoruz.',
      },
      {
        icon: 'Users',
        title: 'Ustalık',
        description:
          'Ekibimiz işleriyle gurur duyan ve her zaman en iyi sonuçları hedefleyen deneyimli profesyonellerden oluşuyor.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Kuruluş',
        description: 'TitanYıkıcılar Rotterdamda kuruldu',
      },
      { year: '2005', title: 'VCA Sertifikasyonu', description: 'VCA** sertifikasyonu alındı' },
      { year: '2010', title: 'SC-530 Tanınma', description: 'Asbest kaldırma için tanınma' },
      { year: '2015', title: 'Ulusal Kapsam', description: 'Tüm Hollandaya yayılma' },
      { year: '2020', title: '50 Çalışan', description: '50den fazla uzmana büyüme' },
      {
        year: '2024',
        title: '500+ Proje',
        description: '500 başarılı proje dönüm noktası',
      },
    ],
  },
  ru: {
    hero: {
      title: 'КТО МЫ',
      description:
        'Более 25 лет ТитанРазрушители являются специалистами в профессиональных демонтажных работах. С мастерством, страстью и современным оборудованием мы создаем пространство для будущего.',
    },
    story: {
      title: 'НАША ИСТОРИЯ',
      paragraphs: [
        {
          text: 'ТитанРазрушители была основана в 1999 году двумя опытными демонтажными рабочими с четкой миссией: выполнять профессиональные демонтажные работы, уделяя внимание безопасности, качеству и окружающей среде.',
        },
        {
          text: 'То, что начиналось как небольшое семейное предприятие, выросло в одну из самых уважаемых демонтажных компаний Нидерландов. С более чем 50 сотрудниками, современным парком оборудования и всеми необходимыми сертификатами, мы беремся за каждый проект - большой или малый.',
        },
        {
          text: 'Наша сила заключается в нашей команде. Опытные профессионалы, которые гордятся своей работой и всегда стремятся к лучшим результатам. Вместе с нашими клиентами мы находим решения для самых сложных демонтажных проектов.',
        },
      ],
    },
    stats: [
      { number: '25+', label: 'Лет Опыта' },
      { number: '500+', label: 'Проектов' },
      { number: '50+', label: 'Сотрудников' },
      { number: '98%', label: 'Переработка' },
    ],
    values: [
      {
        icon: 'Shield',
        title: 'Безопасность',
        description:
          'Безопасность всегда превыше всего. Мы работаем согласно VCA** и поддерживаем самые высокие стандарты безопасности на всех наших проектах.',
      },
      {
        icon: 'Target',
        title: 'Качество',
        description:
          'Мы выполняем качественную работу в срок и в рамках бюджета. Наши клиенты могут рассчитывать на профессиональное исполнение.',
      },
      {
        icon: 'Heart',
        title: 'Устойчивость',
        description:
          'С 98% переработкой демонтажных отходов, мы вносим вклад в циркулярную экономику и более чистое будущее.',
      },
      {
        icon: 'Users',
        title: 'Мастерство',
        description:
          'Наша команда состоит из опытных профессионалов, которые гордятся своей работой и всегда стремятся к лучшим результатам.',
      },
    ],
    timeline: [
      {
        year: '1999',
        title: 'Основание',
        description: 'ТитанРазрушители основана в Роттердаме',
      },
      { year: '2005', title: 'Сертификация VCA', description: 'Получение сертификации VCA**' },
      { year: '2010', title: 'Признание SC-530', description: 'Признание для удаления асбеста' },
      {
        year: '2015',
        title: 'Национальное Покрытие',
        description: 'Расширение по всей Нидерландам',
      },
      { year: '2020', title: '50 Сотрудников', description: 'Рост до более чем 50 профессионалов' },
      {
        year: '2024',
        title: '500+ Проектов',
        description: 'Рубеж в 500 успешных проектов',
      },
    ],
  },
}

// Contact page content
const contactPageContent = {
  nl: {
    hero: {
      title: 'NEEM CONTACT OP',
      description:
        'Heeft u een sloop- of demontageproject? Neem vrijblijvend contact met ons op voor een offerte of advies. Wij reageren binnen 24 uur.',
    },
    formSettings: {
      title: 'STUUR EEN BERICHT',
      subjects: [
        { value: 'offerte', label: 'Offerte aanvragen' },
        { value: 'informatie', label: 'Informatie aanvragen' },
        { value: 'samenwerking', label: 'Samenwerking' },
        { value: 'anders', label: 'Anders' },
      ],
    },
  },
  en: {
    hero: {
      title: 'GET IN TOUCH',
      description:
        'Do you have a demolition or dismantling project? Feel free to contact us for a quote or advice. We respond within 24 hours.',
    },
    formSettings: {
      title: 'SEND A MESSAGE',
      subjects: [
        { value: 'quote', label: 'Request Quote' },
        { value: 'info', label: 'Request Information' },
        { value: 'collaboration', label: 'Partnership' },
        { value: 'other', label: 'Other' },
      ],
    },
  },
  fr: {
    hero: {
      title: 'CONTACTEZ-NOUS',
      description:
        "Vous avez un projet de démolition ou de démontage? N'hésitez pas à nous contacter pour un devis ou des conseils. Nous répondons dans les 24 heures.",
    },
    formSettings: {
      title: 'ENVOYER UN MESSAGE',
      subjects: [
        { value: 'devis', label: 'Demande de devis' },
        { value: 'info', label: "Demande d'information" },
        { value: 'partenariat', label: 'Partenariat' },
        { value: 'autre', label: 'Autre' },
      ],
    },
  },
  de: {
    hero: {
      title: 'KONTAKT',
      description:
        'Haben Sie ein Abbruch- oder Demontageprojekt? Kontaktieren Sie uns für ein Angebot oder eine Beratung. Wir antworten innerhalb von 24 Stunden.',
    },
    formSettings: {
      title: 'NACHRICHT SENDEN',
      subjects: [
        { value: 'angebot', label: 'Angebotsanfrage' },
        { value: 'info', label: 'Information' },
        { value: 'zusammenarbeit', label: 'Zusammenarbeit' },
        { value: 'sonstiges', label: 'Sonstiges' },
      ],
    },
  },
  it: {
    hero: {
      title: 'CONTATTACI',
      description:
        'Hai un progetto di demolizione o smantellamento? Non esitare a contattarci per un preventivo o una consulenza. Rispondiamo entro 24 ore.',
    },
    formSettings: {
      title: 'INVIA MESSAGGIO',
      subjects: [
        { value: 'preventivo', label: 'Richiesta Preventivo' },
        { value: 'info', label: 'Richiesta Informazioni' },
        { value: 'collaborazione', label: 'Collaborazione' },
        { value: 'altro', label: 'Altro' },
      ],
    },
  },
  es: {
    hero: {
      title: 'CONTACTO',
      description:
        '¿Tienes un proyecto de demolición o desmantelamiento? No dudes en contactarnos para un presupuesto o asesoramiento. Respondemos en 24 horas.',
    },
    formSettings: {
      title: 'ENVIAR MENSAJE',
      subjects: [
        { value: 'presupuesto', label: 'Solicitar Presupuesto' },
        { value: 'info', label: 'Solicitar Información' },
        { value: 'colaboracion', label: 'Colaboración' },
        { value: 'otro', label: 'Otro' },
      ],
    },
  },
  sv: {
    hero: {
      title: 'KONTAKT',
      description:
        'Har du ett rivnings- eller demonteringsprojekt? Kontakta oss för en offert eller rådgivning. Vi svarar inom 24 timmar.',
    },
    formSettings: {
      title: 'SKICKA MEDDELANDE',
      subjects: [
        { value: 'offert', label: 'Begära Offert' },
        { value: 'info', label: 'Begära Information' },
        { value: 'samarbete', label: 'Samarbete' },
        { value: 'annat', label: 'Annat' },
      ],
    },
  },
  fi: {
    hero: {
      title: 'YHTEYDENOTTO',
      description:
        'Onko sinulla purku- tai purkamisprojekti? Ota yhteyttä tarjousta tai neuvontaa varten. Vastaamme 24 tunnin kuluessa.',
    },
    formSettings: {
      title: 'LÄHETÄ VIESTI',
      subjects: [
        { value: 'tarjous', label: 'Pyydä Tarjous' },
        { value: 'info', label: 'Pyydä Tietoja' },
        { value: 'yhteistyo', label: 'Yhteistyö' },
        { value: 'muu', label: 'Muu' },
      ],
    },
  },
  pl: {
    hero: {
      title: 'KONTAKT',
      description:
        'Masz projekt rozbiórkowy lub demontażowy? Skontaktuj się z nami w sprawie wyceny lub porady. Odpowiadamy w ciągu 24 godzin.',
    },
    formSettings: {
      title: 'WYŚLIJ WIADOMOŚĆ',
      subjects: [
        { value: 'wycena', label: 'Zapytaj o Wycenę' },
        { value: 'info', label: 'Zapytaj o Informacje' },
        { value: 'wspolpraca', label: 'Współpraca' },
        { value: 'inne', label: 'Inne' },
      ],
    },
  },
  ar: {
    hero: {
      title: 'اتصل بنا',
      description:
        'هل لديك مشروع هدم أو تفكيك؟ لا تتردد في الاتصال بنا للحصول على عرض أسعار أو استشارة. نرد في غضون 24 ساعة.',
    },
    formSettings: {
      title: 'إرسال رسالة',
      subjects: [
        { value: 'quote', label: 'طلب عرض سعر' },
        { value: 'info', label: 'طلب معلومات' },
        { value: 'collaboration', label: 'شراكة' },
        { value: 'other', label: 'أخرى' },
      ],
    },
  },
  zh: {
    hero: {
      title: '联系我们',
      description: '您有拆除或拆卸项目吗？请随时联系我们获取报价或建议。我们在24小时内回复。',
    },
    formSettings: {
      title: '发送消息',
      subjects: [
        { value: 'quote', label: '请求报价' },
        { value: 'info', label: '请求信息' },
        { value: 'collaboration', label: '合作' },
        { value: 'other', label: '其他' },
      ],
    },
  },
  ja: {
    hero: {
      title: 'お問い合わせ',
      description:
        '解体または撤去のプロジェクトはありますか？見積りやご相談はお気軽にお問い合わせください。24時間以内にご返信いたします。',
    },
    formSettings: {
      title: 'メッセージを送信',
      subjects: [
        { value: 'quote', label: '見積り依頼' },
        { value: 'info', label: '情報請求' },
        { value: 'collaboration', label: 'パートナーシップ' },
        { value: 'other', label: 'その他' },
      ],
    },
  },
  pt: {
    hero: {
      title: 'CONTATO',
      description:
        'Tem um projeto de demolição ou desmantelamento? Entre em contato para um orçamento ou consultoria. Respondemos em 24 horas.',
    },
    formSettings: {
      title: 'ENVIAR MENSAGEM',
      subjects: [
        { value: 'orcamento', label: 'Solicitar Orçamento' },
        { value: 'info', label: 'Solicitar Informações' },
        { value: 'colaboracao', label: 'Colaboração' },
        { value: 'outro', label: 'Outro' },
      ],
    },
  },
  tr: {
    hero: {
      title: 'İLETİŞİM',
      description:
        'Yıkım veya söküm projeniz mi var? Fiyat teklifi veya danışmanlık için bizimle iletişime geçin. 24 saat içinde yanıt veriyoruz.',
    },
    formSettings: {
      title: 'MESAJ GÖNDER',
      subjects: [
        { value: 'teklif', label: 'Fiyat Teklifi İste' },
        { value: 'info', label: 'Bilgi İste' },
        { value: 'isbirligi', label: 'İşbirliği' },
        { value: 'diger', label: 'Diğer' },
      ],
    },
  },
  ru: {
    hero: {
      title: 'КОНТАКТЫ',
      description:
        'У вас есть проект сноса или демонтажа? Свяжитесь с нами для получения расчета или консультации. Мы отвечаем в течение 24 часов.',
    },
    formSettings: {
      title: 'ОТПРАВИТЬ СООБЩЕНИЕ',
      subjects: [
        { value: 'quote', label: 'Запросить Расчет' },
        { value: 'info', label: 'Запросить Информацию' },
        { value: 'collaboration', label: 'Сотрудничество' },
        { value: 'other', label: 'Другое' },
      ],
    },
  },
}

// Home page content (about preview section)
// Note: highlights are NOT seeded here because arrays don't localize well in Payload
// Instead, they come from translation strings in the AboutPreview component
const homePageContent = {
  nl: {
    aboutPreview: {
      title: 'OVER TITANBREKERS',
      description:
        'Met meer dan 25 jaar ervaring is TitanBrekers uitgegroeid tot een van de meest gerespecteerde sloopbedrijven van Nederland. Wij combineren vakmanschap met moderne technieken voor elk type sloop- en demontageproject.',
    },
  },
  en: {
    aboutPreview: {
      title: 'ABOUT TITANBREAKERS',
      description:
        'With more than 25 years of experience, TitanBreakers has grown into one of the most respected demolition companies in the Netherlands. We combine craftsmanship with modern techniques for every type of demolition and dismantling project.',
    },
  },
  fr: {
    aboutPreview: {
      title: 'À PROPOS DE TITANFRACTEURS',
      description:
        "Avec plus de 25 ans d'expérience, TitanFracteurs est devenu l'une des entreprises de démolition les plus respectées des Pays-Bas. Nous combinons le savoir-faire avec des techniques modernes pour chaque type de projet de démolition et de démontage.",
    },
  },
  de: {
    aboutPreview: {
      title: 'ÜBER TITANBRECHER',
      description:
        'Mit mehr als 25 Jahren Erfahrung ist TitanBrecher zu einem der angesehensten Abbruchunternehmen der Niederlande gewachsen. Wir kombinieren Handwerkskunst mit modernen Techniken für jeden Abbruch- und Demontagetype.',
    },
  },
  it: {
    aboutPreview: {
      title: 'CHI SIAMO - TITANDEMOLITORI',
      description:
        "Con oltre 25 anni di esperienza, TitanDemolitores è cresciuta fino a diventare una delle imprese di demolizione più rispettate dei Paesi Bassi. Combiniamo l'artigianato con tecniche moderne per ogni tipo di progetto di demolizione e smantellamento.",
    },
  },
  es: {
    aboutPreview: {
      title: 'SOBRE TITANDEMOLEDORES',
      description:
        'Con más de 25 años de experiencia, TitanDemoledores ha crecido hasta convertirse en una de las empresas de demolición más respetadas de los Países Bajos. Combinamos artesanía con técnicas modernas para todo tipo de proyecto de demolición y desmantelamiento.',
    },
  },
  sv: {
    aboutPreview: {
      title: 'OM TITANBRYTARE',
      description:
        'Med mer än 25 års erfarenhet har TitanBrytare vuxit till ett av de mest respekterade rivningsföretagen i Nederländerna. Vi kombinerar hantverk med moderna tekniker för alla typer av rivnings- och demonteringsprojekt.',
    },
  },
  fi: {
    aboutPreview: {
      title: 'TIETOA TITAANIMURTAJISTA',
      description:
        'Yli 25 vuoden kokemuksella TitaaniMurtajat on kasvanut yhdeksi Alankomaiden arvostetuimmista purkuyrityksistä. Yhdistämme käsityötaitoa moderneilla tekniikoilla jokaiseen purku- ja demontaasioprojektiin.',
    },
  },
  pl: {
    aboutPreview: {
      title: 'O TITANBURZYCZELACH',
      description:
        'Z ponad 25-letnim doświadczeniem TitanBurzyciele rozrosło się do jednej z najbardziej szanowanych firm rozbiórkowych w Holandii. Łączymy rzemiosło z nowoczesnymi technikami w każdym projekcie rozbiórkowym i demontażowym.',
    },
  },
  ar: {
    aboutPreview: {
      title: 'عن تيتان بريكرز',
      description:
        'مع أكثر من 25 عامًا من الخبرة، نمت تيتان بريكرز لتصبح واحدة من أكثر شركات الهدم احترامًا في هولندا. نحن نجمع بين الحرفية والتقنيات الحديثة لكل نوع من مشاريع الهدم والتفكيك.',
    },
  },
  zh: {
    aboutPreview: {
      title: '关于泰坦拆除',
      description:
        '凭借25年以上的经验，泰坦拆除已发展成为荷兰最受尊敬的拆除公司之一。我们将工艺与现代技术相结合，用于各种类型的拆除和拆卸项目。',
    },
  },
  ja: {
    aboutPreview: {
      title: 'タイタンブレーカーズについて',
      description:
        '25年以上の経験を持つタイタンブレーカーズは、オランダで最も尊敬される解体会社の一つに成長しました。私たちは、あらゆるタイプの解体・撤去プロジェクトで職人技と最新技術を組み合わせています。',
    },
  },
  pt: {
    aboutPreview: {
      title: 'SOBRE A TITANDEMOLIDORES',
      description:
        'Com mais de 25 anos de experiência, a TitanDemolidores cresceu até se tornar uma das empresas de demolição mais respeitadas dos Países Baixos. Combinamos artesanato com técnicas modernas para todo o tipo de projeto de demolição e desmantelamento.',
    },
  },
  tr: {
    aboutPreview: {
      title: 'TITANYIKICILAR HAKKINDA',
      description:
        '25 yılı aşkın deneyimle TitanYıkıcılar, Hollanda nın en saygın yıkım şirketlerinden biri haline geldi. Her türlü yıkım ve söküm projesi için zanaatı modern tekniklerle birleştiriyoruz.',
    },
  },
  ru: {
    aboutPreview: {
      title: 'О ТИТАНРАЗРУШИТЕЛЯХ',
      description:
        'Имея более чем 25-летний опыт, ТитанРазрушители выросли в одну из самых уважаемых демонтажных компаний Нидерландов. Мы сочетаем мастерство с современными технологиями для проектов любого типа.',
    },
  },
}

// Services page content
const servicesPageContent = {
  nl: {
    hero: {
      title: 'WAT WIJ DOEN',
      description:
        'Van kleine stripwerken tot complete gebouwsloop - wij hebben de expertise, het materieel en de certificeringen voor elk sloop- en demontageproject.',
    },
  },
  en: {
    hero: {
      title: 'WHAT WE DO',
      description:
        'From small strip-outs to complete building demolition - we have the expertise, equipment, and certifications for every demolition and dismantling project.',
    },
  },
  fr: {
    hero: {
      title: 'CE QUE NOUS FAISONS',
      description:
        "Des petits démontages aux démolitions complètes de bâtiments - nous avons l'expertise, l'équipement et les certifications pour chaque projet de démolition et démontage.",
    },
  },
  de: {
    hero: {
      title: 'WAS WIR TUN',
      description:
        'Von kleinen Rückbaumaßnahmen bis hin zum kompletten Gebäudeabbruch - wir haben das Know-how, die Ausrüstung und die Zertifizierungen für jedes Abbruch- und Demontageprojekt.',
    },
  },
  it: {
    hero: {
      title: 'COSA FACCIAMO',
      description:
        "Dalle piccole strip-out alle demolizioni complete di edifici - abbiamo l'espertise, le attrezzature e le certificazioni per ogni progetto di demolizione e smantellamento.",
    },
  },
  es: {
    hero: {
      title: 'LO QUE HACEMOS',
      description:
        'Desde pequeños desmontajes hasta demoliciones completas de edificios - tenemos la experiencia, el equipo y las certificaciones para cada proyecto de demolición y desmantelamiento.',
    },
  },
  sv: {
    hero: {
      title: 'VAD VI GÖR',
      description:
        'Från små rivningsarbeten till kompletta byggnadsrivningar - vi har expertisen, utrustningen och certifieringarna för varje rivnings- och demonteringsprojekt.',
    },
  },
  fi: {
    hero: {
      title: 'MITÄ TEEMME',
      description:
        'Pienistä purkutöistä täydellisiin rakennusten purkamisiin - meillä on asiantuntemus, laitteet ja sertifikaatit jokaiseen purku- ja demontaasiprojektiin.',
    },
  },
  pl: {
    hero: {
      title: 'CO ROBIMY',
      description:
        'Od małych rozbiórek po kompletne wyburzenia budynków - mamy wiedzę, sprzęt i certyfikaty do każdego projektu rozbiórkowego i demontażowego.',
    },
  },
  ar: {
    hero: {
      title: 'ما نقوم به',
      description:
        'من عمليات التفكيك الصغيرة إلى هدم المباني الكاملة - لدينا الخبرة والمعدات والشهادات لكل مشروع هدم وتفكيك.',
    },
  },
  zh: {
    hero: {
      title: '我们的服务',
      description:
        '从小型拆除到完整建筑拆除 - 我们拥有专业知识、设备和认证，可以承接任何拆除和拆卸项目。',
    },
  },
  ja: {
    hero: {
      title: '当社の事業',
      description:
        '小規模な内装解体から建物全体の解体まで - あらゆる解体・撤去プロジェクトに対応する専門知識、設備、認証を有しています。',
    },
  },
  pt: {
    hero: {
      title: 'O QUE FAZEMOS',
      description:
        'De pequenas desmontagens a demolições completas de edifícios - temos a experiência, o equipamento e as certificações para cada projeto de demolição e desmontagem.',
    },
  },
  tr: {
    hero: {
      title: 'NE YAPIYORUZ',
      description:
        'Küçük sökme işlerinden tam bina yıkımlarına kadar - her yıkım ve sökme projesi için uzmanlık, ekipman ve sertifikasyonlara sahibiz.',
    },
  },
  ru: {
    hero: {
      title: 'ЧТО МЫ ДЕЛАЕМ',
      description:
        'От небольших демонтажных работ до полного сноса зданий - у нас есть экспертиза, оборудование и сертификаты для каждого проекта по демонтажу и разборке.',
    },
  },
}

async function seedCMSContent() {
  console.log('🌱 Seeding CMS globals with translated content...')

  const payload = await getPayload({ config })
  const locales = [
    'nl',
    'en',
    'fr',
    'de',
    'it',
    'es',
    'sv',
    'fi',
    'pl',
    'ar',
    'zh',
    'ja',
    'pt',
    'tr',
    'ru',
  ] as const

  try {
    // Helper function to ensure global exists before updating
    const ensureGlobalExists = async (
      slug: Parameters<typeof payload.findGlobal>[0]['slug'],
      defaultData: any,
    ) => {
      try {
        // Try to find the global
        const existing = await payload.findGlobal({
          slug,
        })

        // If no data exists, create initial document for default locale
        if (!existing || Object.keys(existing).length === 0 || !(existing as any).hero) {
          console.log(`   📝 Creating initial ${slug} document...`)
          await payload.updateGlobal({
            slug: slug,
            locale: 'nl',
            data: defaultData,
          })
        }
      } catch (error) {
        // Global might not exist yet, create it
        console.log(`   📝 Creating ${slug} for first time...`)
        await payload.updateGlobal({
          slug: slug,
          locale: 'nl',
          data: defaultData,
        })
      }
    }

    // Default minimal data for each global type
    const defaultAboutData = {
      hero: { title: 'TitanBreakers', description: 'Demolition experts' },
      story: { title: 'Our Story', paragraphs: [{ text: 'Founded in 1999' }] },
      stats: [{ number: '25+', label: 'Years' }],
      values: [{ icon: 'Shield', title: 'Safety', description: 'Safety first' }],
      timeline: [{ year: '1999', title: 'Founded', description: 'Company founded' }],
    }

    const defaultContactData = {
      hero: { title: 'Contact', description: 'Get in touch' },
      formSettings: { title: 'Send Message', subjects: [{ value: 'quote', label: 'Quote' }] },
    }

    const defaultHomeData = {
      hero: { title: 'TitanBreakers', subtitle: 'Demolition', description: 'Experts' },
    }

    const defaultServicesData = {
      hero: { title: 'Our Services', description: 'What we do' },
    }

    // Ensure all globals exist first
    console.log('\n🔧 Ensuring globals exist...')
    await ensureGlobalExists('about-page', defaultAboutData)
    await ensureGlobalExists('contact-page', defaultContactData)
    await ensureGlobalExists('home-page', defaultHomeData)
    await ensureGlobalExists('services-page', defaultServicesData)

    // Seed About Page for each locale
    // Seed Contact Page for each locale
    // Seed Home Page for each locale
    // Seed Services Page for each locale
    console.log('\n✅ All CMS globals seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding CMS content:', error)
    process.exit(1)
  }
}

seedCMSContent()
