import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import { blogTranslations } from './blog-all-translations.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const { default: config } = await import(path.join(__dirname, '..', 'src', 'payload.config.ts'))

// All supported locales
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
]

// Translation data for all content
const translations = {
  services: {
    manual: {
      nl: {
        title: 'Handmatige Sloop',
        description:
          'Voorzichtige en nauwkeurige handmatige sloopwerkzaamheden voor binnenprojecten waar machines niet kunnen komen.',
      },
      en: {
        title: 'Manual Demolition',
        description:
          'Careful and precise manual demolition work for interior projects where machinery cannot access.',
      },
      fr: {
        title: 'Démolition Manuelle',
        description:
          'Travaux de démolition manuelle soignés et précis pour projets intérieurs où les machines ne peuvent pas accéder.',
      },
      de: {
        title: 'Manueller Abriss',
        description:
          'Sorgfältige und präzise manuelle Abbrucharbeiten für Innenprojekte, wo Maschinen nicht hinkommen.',
      },
      it: {
        title: 'Demolizione Manuale',
        description:
          'Lavori di demolizione manuale accurati e precisi per progetti interni dove le macchine non possono accedere.',
      },
      es: {
        title: 'Demolición Manual',
        description:
          'Trabajos de demolición manual cuidadosos y precisos para proyectos interiores donde la maquinaria no puede acceder.',
      },
      sv: {
        title: 'Manuell Rivning',
        description:
          'Försiktiga och noggranna manuella rivningsarbeten för inomhusprojekt där maskiner inte kan komma åt.',
      },
      fi: {
        title: 'Käsityöpurkaminen',
        description:
          'Huolelliset ja tarkat käsityöpurkaminen sisäprojekteihin, joihin koneet eivät pääse.',
      },
      pl: {
        title: 'Rozbiórka Ręczna',
        description:
          'Ostrożne i precyzyjne prace rozbiórkowe ręczne dla projektów wewnętrznych, gdzie maszyny nie mają dostępu.',
      },
      ar: {
        title: 'الهدم اليدوي',
        description: 'أعمال هدم يدوية دقيقة وحذرة للمشاريع الداخلية حيث لا تستطيع الآلات الوصول.',
      },
      zh: {
        title: '人工拆除',
        description: '在室内项目中进行谨慎精确的人工拆除工作，机械无法进入的地方。',
      },
      ja: {
        title: '手動解体',
        description: '機械がアクセスできない室内プロジェクトのための慎重かつ正確な手動解体作業。',
      },
      pt: {
        title: 'Demolição Manual',
        description:
          'Trabalhos de demolição manual cuidadosos e precisos para projetos interiores onde máquinas não podem acessar.',
      },
      tr: {
        title: 'Manuel Yıkım',
        description:
          'Makinelerin erişemediği iç mekan projeleri için dikkatli ve hassas manuel yıkım çalışmaları.',
      },
      ru: {
        title: 'Ручной Демонтаж',
        description:
          'Осторожные и точные ручные демонтажные работы для внутренних проектов, куда нет доступа технике.',
      },
    },
    selective: {
      nl: {
        title: 'Selectieve Sloop',
        description:
          'Selectief slopen met oog voor hergebruik van materialen en behoud van bestaande structuren.',
      },
      en: {
        title: 'Selective Demolition',
        description:
          'Selective demolition with attention to material reuse and preservation of existing structures.',
      },
      fr: {
        title: 'Démolition Sélective',
        description:
          'Démolition sélective en accordant attention au réemploi des matériaux et à la préservation des structures existantes.',
      },
      de: {
        title: 'Selektiver Abriss',
        description:
          'Selektiver Abriss mit Augenmerk auf Wiederverwendung von Materialien und Erhaltung bestehender Strukturen.',
      },
      it: {
        title: 'Demolizione Selettiva',
        description:
          'Demolizione selettiva con attenzione al riutilizzo dei materiali e alla preservazione delle strutture esistenti.',
      },
      es: {
        title: 'Demolición Selectiva',
        description:
          'Demolición selectiva con atención a la reutilización de materiales y preservación de estructuras existentes.',
      },
      sv: {
        title: 'Selektiv Rivning',
        description:
          'Selektiv rivning med fokus på återanvändning av material och bevarande av befintliga strukturer.',
      },
      fi: {
        title: 'Valikoiva Purkaminen',
        description:
          'Valikoiva purkaminen huomioiden materiaalien uusiokäyttö ja olemassa olevien rakenteiden säilyttäminen.',
      },
      pl: {
        title: 'Rozbiórka Selektywna',
        description:
          'Rozbiórka selektywna z uwzględnieniem ponownego wykorzystania materiałów i zachowania istniejących struktur.',
      },
      ar: {
        title: 'الهدم الانتقائي',
        description:
          'الهدم الانتقائي مع الاهتمام بإعادة استخدام المواد والحفاظ على الهياكل الموجودة.',
      },
      zh: { title: '选择性拆除', description: '选择性拆除，注重材料再利用和现有结构的保护。' },
      ja: {
        title: '選択的解体',
        description: '材料の再利用と既存構造の保護に注意を払った選択的解体。',
      },
      pt: {
        title: 'Demolição Seletiva',
        description:
          'Demolição seletiva com atenção à reutilização de materiais e preservação de estruturas existentes.',
      },
      tr: {
        title: 'Seçici Yıkım',
        description:
          'Materyallerin yeniden kullanımına ve mevcut yapıların korunmasına dikkat eden seçici yıkım.',
      },
      ru: {
        title: 'Селективный Демонтаж',
        description:
          'Селективный демонтаж с вниманием к повторному использованию материалов и сохранению существующих конструкций.',
      },
    },
    asbestos: {
      nl: {
        title: 'Asbest Sanering',
        description:
          'Veilige en gecertificeerde asbestverwijdering volgens SC-530 normen door gespecialiseerde professionals.',
      },
      en: {
        title: 'Asbestos Removal',
        description:
          'Safe and certified asbestos removal according to SC-530 standards by specialized professionals.',
      },
      fr: {
        title: 'Désamiantage',
        description:
          "Retrait de l'amiante sûr et certifié selon les normes SC-530 par des professionnels spécialisés.",
      },
      de: {
        title: 'Asbestsanierung',
        description:
          'Sichere und zertifizierte Asbestentfernung nach SC-530-Normen durch spezialisierte Fachkräfte.',
      },
      it: {
        title: 'Rimozione Amianto',
        description:
          "Rimozione dell'amianto sicura e certificata secondo gli standard SC-530 da professionisti specializzati.",
      },
      es: {
        title: 'Retiro de Amianto',
        description:
          'Retiro de amianto seguro y certificado según estándares SC-530 por profesionales especializados.',
      },
      sv: {
        title: 'Asbestsanering',
        description:
          'Säker och certifierad asbestsanering enligt SC-530-standarder av specialiserade professionella.',
      },
      fi: {
        title: 'Asbestin Poisto',
        description:
          'Turvallinen ja sertifioitu asbestin poisto SC-530-standardien mukaisesti erikoistuneiden ammattilaisten toimesta.',
      },
      pl: {
        title: 'Usuwanie Azbestu',
        description:
          'Bezpieczne i certyfikowane usuwanie azbestu zgodnie z normami SC-530 przez wyspecjalizowanych profesjonalistów.',
      },
      ar: {
        title: 'إزالة الأسبستوس',
        description:
          'إزالة الأسبستوس الآمنة والمعتمدة وفقًا لمعايير SC-530 من قبل متخصصين محترفين.',
      },
      zh: { title: '石棉清除', description: '由专业人员进行符合SC-530标准的安全认证石棉清除。' },
      ja: {
        title: 'アスベスト除去',
        description: 'SC-530規格に準拠した専門家による安全で認定されたアスベスト除去。',
      },
      pt: {
        title: 'Remoção de Amianto',
        description:
          'Remoção de amianto segura e certificada de acordo com os padrões SC-530 por profissionais especializados.',
      },
      tr: {
        title: 'Asbet Temizleme',
        description:
          'Uzman profesyoneller tarafından SC-530 standartlarına göre güvenli ve sertifikalı asbet temizleme.',
      },
      ru: {
        title: 'Удаление Асбеста',
        description:
          'Безопасное и сертифицированное удаление асбеста по стандартам SC-530 специализированными профессионалами.',
      },
    },
    clearing: {
      nl: {
        title: 'Woning Ontruiming',
        description:
          'Complete woningontruiming en opruiming van verontreinigde panden met zorg voor milieu en veiligheid.',
      },
      en: {
        title: 'Property Clearing',
        description:
          'Complete property clearing and cleanup of contaminated buildings with care for environment and safety.',
      },
      fr: {
        title: 'Déblayage',
        description:
          "Déblayage complet et nettoyage de bâtiments contaminés avec souci de l'environnement et de la sécurité.",
      },
      de: {
        title: 'Entrümpelung',
        description:
          'Komplette Entrümpelung und Reinigung kontaminierter Gebäude mit Sorge für Umwelt und Sicherheit.',
      },
      it: {
        title: 'Sgombero',
        description:
          'Sgombero completo e pulizia di edifici contaminati con attenzione per ambiente e sicurezza.',
      },
      es: {
        title: 'Despeje',
        description:
          'Despeje completo y limpieza de edificios contaminados con cuidado por el medio ambiente y la seguridad.',
      },
      sv: {
        title: 'Rensning',
        description:
          'Fullständig rensning och städning av förorenade byggnader med omsorg om miljö och säkerhet.',
      },
      fi: {
        title: 'Tyhjennys',
        description:
          'Täydellinen tyhjennys ja saastuneiden rakennusten puhdistus huolehtien ympäristöstä ja turvallisuudesta.',
      },
      pl: {
        title: 'Oczyszczanie',
        description:
          'Pełne oczyszczanie i czyszczenie zanieczyszczonych budynków z dbałością o środowisko i bezpieczeństwo.',
      },
      ar: {
        title: 'تنظيف العقارات',
        description: 'تنظيف العقارات بالكامل وتنظيف المباني الملوثة مع الاهتمام بالبيئة والسلامة.',
      },
      zh: { title: '物业清理', description: '全面清理物业和清洁受污染建筑，注重环境和安全。' },
      ja: {
        title: '物件片付け',
        description: '環境と安全に配慮した物件の完全な片付けと汚染された建物の清掃。',
      },
      pt: {
        title: 'Limpeza',
        description:
          'Limpeza completa de propriedades e limpeza de edifícios contaminados com cuidado pelo ambiente e segurança.',
      },
      tr: {
        title: 'Temizlik',
        description:
          'Çevre ve güvenliğe özen göstererek mülklerin tam temizliği ve kirli binaların temizlenmesi.',
      },
      ru: {
        title: 'Очистка Объектов',
        description:
          'Полная очистка объектов и уборка загрязненных зданий с заботой об окружающей среде и безопасности.',
      },
    },
    kitchen: {
      nl: {
        title: 'Keuken en Badkamer Sloop',
        description:
          'Professionele keuken- en badkamersloop voor renovatieprojecten met minimale overlast.',
      },
      en: {
        title: 'Kitchen & Bathroom Demolition',
        description:
          'Professional kitchen and bathroom demolition for renovation projects with minimal disruption.',
      },
      fr: {
        title: 'Démolition Cuisine & Salle de Bain',
        description:
          'Démolition professionnelle de cuisine et salle de bain pour projets de rénovation avec perturbation minimale.',
      },
      de: {
        title: 'Küchen- & Badezimmerabbriss',
        description:
          'Professioneller Küchen- und Badezimmerabbriss für Renovierungsprojekte mit minimaler Störung.',
      },
      it: {
        title: 'Demolizione Cucina e Bagno',
        description:
          'Demolizione professionale di cucina e bagno per progetti di ristrutturazione con minimo disagio.',
      },
      es: {
        title: 'Demolición Cocina y Baño',
        description:
          'Demolición profesional de cocina y baño para proyectos de renovación con mínima interrupción.',
      },
      sv: {
        title: 'Kök & Badrumsrivning',
        description:
          'Professionell kök- och badrumsrivning för renoveringsprojekt med minimal störning.',
      },
      fi: {
        title: 'Keittiö- ja Kylpyhuonepurku',
        description:
          'Ammattimainen keittiö- ja kylpyhuonepurku remonttiprojekteihin minimaalisella häiriöllä.',
      },
      pl: {
        title: 'Rozbiórka Kuchni i Łazienki',
        description:
          'Profesjonalna rozbiórka kuchni i łazienki dla projektów renowacyjnych z minimalnym zakłóceniem.',
      },
      ar: {
        title: 'هدم المطبخ والحمام',
        description: 'هدم المطبخ والحمام الاحترافي لمشاريع التجديد مع الحد الأدنى من الاضطرابات.',
      },
      zh: {
        title: '厨房和浴室拆除',
        description: '专业的厨房和浴室拆除，用于翻新项目，干扰最小。',
      },
      ja: {
        title: 'キッチン・バスルーム解体',
        description:
          '最小限の混乱でリノベーションプロジェクトのためのプロのキッチンとバスルーム解体。',
      },
      pt: {
        title: 'Demolição Cozinha e Banheiro',
        description:
          'Demolição profissional de cozinha e banheiro para projetos de renovação com mínima interrupção.',
      },
      tr: {
        title: 'Mutfak ve Banyo Yıkımı',
        description:
          'Minimum aksaklıkla renovasyon projeleri için profesyonel mutfak ve banyo yıkımı.',
      },
      ru: {
        title: 'Демонтаж Кухни и Ванной',
        description:
          'Профессиональный демонтаж кухни и ванной для проектов ремонта с минимальными неудобствами.',
      },
    },
    interior: {
      nl: {
        title: 'Interieur Sloop',
        description:
          'Strip-out werkzaamheden en selectieve sloop van interieurs voor renovatie en herinrichting.',
      },
      en: {
        title: 'Interior Demolition',
        description:
          'Strip-out work and selective demolition of interiors for renovation and redesign.',
      },
      fr: {
        title: 'Démolition Intérieure',
        description:
          "Travaux de démolition et démolition sélective d'intérieurs pour rénovation et réaménagement.",
      },
      de: {
        title: 'Innenabbriss',
        description:
          'Entkernungsarbeiten und selektiver Innenabbriss für Renovierung und Redesign.',
      },
      it: {
        title: 'Demolizione Interna',
        description:
          'Lavori di strip-out e demolizione selettiva di interni per ristrutturazione e riprogettazione.',
      },
      es: {
        title: 'Demolición Interior',
        description:
          'Trabajos de strip-out y demolición selectiva de interiores para renovación y rediseño.',
      },
      sv: {
        title: 'Invändig Rivning',
        description:
          'Strip-out arbete och selektiv rivning av interiörer för renovering och omdesign.',
      },
      fi: {
        title: 'Sisäpurkaminen',
        description:
          'Tyhjennystyöt ja valikoiva sisäpurkaminen remonttia ja uudelleensuunnittelua varten.',
      },
      pl: {
        title: 'Rozbiórka Wewnętrzna',
        description:
          'Prace rozbiórkowe i selektywna rozbiórka wnętrz do renowacji i przeprojektowania.',
      },
      ar: {
        title: 'الهدم الداخلي',
        description: 'أعمال إفراغ وهدم انتقائي للداخليات للتجديد وإعادة التصميم.',
      },
      zh: { title: '室内拆除', description: '用于翻新和重新设计的室内清空工作和选择性拆除。' },
      ja: {
        title: '内部解体',
        description: 'リノベーションと再設計のためのストリップアウト作業と選択的な内部解体。',
      },
      pt: {
        title: 'Demolição Interior',
        description:
          'Trabalhos de esvaziamento e demolição seletiva de interiores para renovação e redesenho.',
      },
      tr: {
        title: 'İç Yıkım',
        description:
          'Yenileme ve yeniden tasarım için şerit dışı çalışmalar ve seçici iç mekan yıkımı.',
      },
      ru: {
        title: 'Внутренний Демонтаж',
        description:
          'Работы по демонтажу и селективный демонтаж интерьеров для ремонта и перепланировки.',
      },
    },
  },
  projects: {
    project1: {
      nl: {
        title: 'Winkelruimte Stripping Rotterdam',
        description:
          'Complete strip-out van een winkelruimte van 500m² in het centrum van Rotterdam voor herontwikkeling tot appartementencomplex.',
      },
      en: {
        title: 'Retail Space Stripping Rotterdam',
        description:
          'Complete strip-out of a 500m² retail space in downtown Rotterdam for redevelopment into an apartment complex.',
      },
      fr: {
        title: 'Déblayage Local Commercial Rotterdam',
        description:
          "Déblayage complet d'un espace commercial de 500m² au centre de Rotterdam pour réaménagement en complexe d'appartements.",
      },
      de: {
        title: 'Geschäftsraum-Entkernung Rotterdam',
        description:
          'Komplette Entkernung eines 500m² Geschäftsraums in der Innenstadt von Rotterdam für Umbau zu einem Wohnkomplex.',
      },
      it: {
        title: 'Sgombero Spazio Commerciale Rotterdam',
        description:
          'Sgombero completo di uno spazio commerciale di 500m² nel centro di Rotterdam per ristrutturazione in complesso residenziale.',
      },
      es: {
        title: 'Despeje Local Comercial Róterdam',
        description:
          'Despeje completo de un local comercial de 500m² en el centro de Róterdam para reurbanización en complejo de apartamentos.',
      },
      sv: {
        title: 'Butiksutrymme Rivning Rotterdam',
        description:
          'Fullständig rivning av ett 500m² butiksutrymme i centrala Rotterdam för ombyggnad till lägenhetskomplex.',
      },
      fi: {
        title: 'Liiketilan Purku Rotterdam',
        description:
          '500m² liiketilan täydellinen purku Rotterdamissa keskustassa asuntokompleksiksi muuttamista varten.',
      },
      pl: {
        title: 'Opróżnienie Lokalu Handlowego Rotterdam',
        description:
          'Pełne opróżnienie 500m² lokalu handlowego w centrum Rotterdamu do przebudowy na kompleks mieszkaniowy.',
      },
      ar: {
        title: 'تفريغ مساحة تجارية روتردام',
        description:
          'تفريغ كامل لمساحة تجارية 500 متر مربع في وسط روتردام لإعادة التطوير إلى مجمع شقق.',
      },
      zh: {
        title: '鹿特丹零售空间清理',
        description: '鹿特丹市中心500平方米零售空间的全面清理，重新开发为公寓综合体。',
      },
      ja: {
        title: 'ロッテルダム小売スペース片付け',
        description:
          'ロッテルダム中心部の500m²小売スペースをマンション複合施設に再開発するための完全な片付け。',
      },
      pt: {
        title: 'Limpeza Espaço Comercial Roterdã',
        description:
          'Limpeza completa de um espaço comercial de 500m² no centro de Roterdã para reurbanização em complexo de apartamentos.',
      },
      tr: {
        title: 'Rotterdam Perakende Alanı Temizliği',
        description:
          'Rotterdam şehir merkezinde 500m² perakende alanın daire kompleksine yeniden geliştirilmesi için tam temizliği.',
      },
      ru: {
        title: 'Очистка Торгового Помещения Роттердам',
        description:
          'Полная очистка 500м² торгового помещения в центре Роттердама для переоборудования в жилой комплекс.',
      },
    },
    project2: {
      nl: {
        title: 'Appartement Renovatie Den Haag',
        description:
          'Volledige renovatie van een appartement in Den Haag inclusief sloop van keuken, badkamer en tussenwanden.',
      },
      en: {
        title: 'Apartment Renovation The Hague',
        description:
          'Complete renovation of an apartment in The Hague including demolition of kitchen, bathroom, and partition walls.',
      },
      fr: {
        title: 'Rénovation Appartement La Haye',
        description:
          "Rénovation complète d'un appartement à La Haye incluant la démolition de la cuisine, salle de bain et cloisons.",
      },
      de: {
        title: 'Wohnungsrenovierung Den Haag',
        description:
          'Komplette Renovierung einer Wohnung in Den Haag einschließlich Abriss von Küche, Bad und Trennwänden.',
      },
      it: {
        title: "Ristrutturazione Appartamento L'Aia",
        description:
          "Ristrutturazione completa di un appartamento all'Aia inclusa demolizione di cucina, bagno e pareti divisorie.",
      },
      es: {
        title: 'Renovación Apartamento La Haya',
        description:
          'Renovación completa de un apartamento en La Haya incluyendo demolición de cocina, baño y tabiques.',
      },
      sv: {
        title: 'Lägenhetsrenovering Haag',
        description:
          'Komplett renovering av en lägenhet i Haag inklusive rivning av kök, badrum och skiljeväggar.',
      },
      fi: {
        title: 'Huoneistoremontti Haag',
        description:
          'Täydellinen huoneistoremontti Haagissa, mukaan lukien keittiön, kylpyhuoneen ja väliseinien purku.',
      },
      pl: {
        title: 'Renowacja Mieszkania Haga',
        description:
          'Kompletna renowacja mieszkania w Hadze, w tym rozbiórka kuchni, łazienki i ścian działowych.',
      },
      ar: {
        title: 'تجديد شقة لاهاي',
        description: 'تجديد كامل لشقة في لاهاي بما في ذلك هدم المطبخ والحمام والجدران الفاصلة.',
      },
      zh: {
        title: '海牙公寓翻新',
        description: '海牙公寓的全面翻新，包括拆除厨房、浴室和隔断墙。',
      },
      ja: {
        title: 'ハーグアパートリノベーション',
        description:
          'ハーグのアパートの全面リノベーション。キッチン、バスルーム、間仕切り壁の解体を含む。',
      },
      pt: {
        title: 'Renovação Apartamento Haia',
        description:
          'Renovação completa de um apartamento em Haia incluindo demolição de cozinha, banheiro e paredes divisórias.',
      },
      tr: {
        title: 'Lahey Daire Renovasyonu',
        description:
          "Lahey'de bir dairenin mutfak, banyo ve bölme duvarlarının yıkılması dahil tam renovasyonu.",
      },
      ru: {
        title: 'Реновация Квартиры Гаага',
        description:
          'Полная реновация квартиры в Гааге, включая демонтаж кухни, ванной и перегородок.',
      },
    },
    project3: {
      nl: {
        title: 'Woning Ontruiming Eindhoven',
        description:
          'Complete ontruiming van een woning in Eindhoven na verhuizing, inclusief verwijderen van vloeren en keuken.',
      },
      en: {
        title: 'Property Clearing Eindhoven',
        description:
          'Complete clearing of a home in Eindhoven after relocation, including removal of floors and kitchen.',
      },
      fr: {
        title: 'Déblayage Maison Eindhoven',
        description:
          "Déblayage complet d'une maison à Eindhoven après déménagement, y compris enlèvement des sols et cuisine.",
      },
      de: {
        title: 'Hausentrümpelung Eindhoven',
        description:
          'Komplette Entrümpelung eines Hauses in Eindhoven nach Umzug, einschließlich Entfernung von Böden und Küche.',
      },
      it: {
        title: 'Sgombero Casa Eindhoven',
        description:
          'Sgombero completo di una casa a Eindhoven dopo trasloco, inclusa rimozione di pavimenti e cucina.',
      },
      es: {
        title: 'Despeje Vivienda Eindhoven',
        description:
          'Despeje completo de una vivienda en Eindhoven tras mudanza, incluyendo eliminación de suelos y cocina.',
      },
      sv: {
        title: 'Husrensning Eindhoven',
        description:
          'Fullständig rensning av ett hus i Eindhoven efter flytt, inklusive borttagning av golv och kök.',
      },
      fi: {
        title: 'Talotyhjennys Eindhoven',
        description:
          'Täydellinen talotyhjennys Eindhovenissa muuton jälkeen, lattiat ja keittiö poistettuina.',
      },
      pl: {
        title: 'Opróżnienie Domu Eindhoven',
        description:
          'Pełne opróżnienie domu w Eindhoven po przeprowadzce, w tym usuwanie podłóg i kuchni.',
      },
      ar: {
        title: 'تنظيف منزل أيندهوفن',
        description:
          'تنظيف كامل لمنزل في أيندهوفن بعد الانتقال، بما في ذلك إزالة الأرضيات والمطبخ.',
      },
      zh: {
        title: '埃因霍温物业清理',
        description: '搬迁后埃因霍温住宅的全面清理，包括拆除地板和厨房。',
      },
      ja: {
        title: 'アイントホーフェン物件片付け',
        description:
          '引っ越し後のアイントホーフェンの住宅を完全に片付け、床とキッチンの撤去を含む。',
      },
      pt: {
        title: 'Limpeza Residência Eindhoven',
        description:
          'Limpeza completa de uma residência em Eindhoven após mudança, incluindo remoção de pisos e cozinha.',
      },
      tr: {
        title: 'Eindhoven Ev Temizliği',
        description:
          "Taşınmadan sonra Eindhoven'de bir evin tam temizliği, zeminlerin ve mutfağın kaldırılması dahil.",
      },
      ru: {
        title: 'Очистка Дома Эйндховен',
        description:
          'Полная очистка дома в Эйндховене после переезда, включая удаление полов и кухни.',
      },
    },
    project4: {
      nl: {
        title: 'Keuken Renovatie Amsterdam',
        description:
          'Strip-out van een keuken in Amsterdam voor complete renovatie met behoud van originele details.',
      },
      en: {
        title: 'Kitchen Renovation Amsterdam',
        description:
          'Strip-out of a kitchen in Amsterdam for complete renovation while preserving original details.',
      },
      fr: {
        title: 'Rénovation Cuisine Amsterdam',
        description:
          "Déblayage d'une cuisine à Amsterdam pour rénovation complète en préservant les détails originaux.",
      },
      de: {
        title: 'Küchenrenovierung Amsterdam',
        description:
          'Entkernung einer Küche in Amsterdam für komplette Renovierung unter Erhaltung originaler Details.',
      },
      it: {
        title: 'Ristrutturazione Cucina Amsterdam',
        description:
          'Sgombero di una cucina ad Amsterdam per ristrutturazione completa preservando i dettagli originali.',
      },
      es: {
        title: 'Renovación Cocina Ámsterdam',
        description:
          'Despeje de una cocina en Ámsterdam para renovación completa preservando los detalles originales.',
      },
      sv: {
        title: 'Köksrenovering Amsterdam',
        description:
          'Rivning av ett kök i Amsterdam för komplett renovering med bevarande av originaldetaljer.',
      },
      fi: {
        title: 'Keittiöremontti Amsterdam',
        description:
          'Keittiön purku Amsterdamissa täydellistä remonttia varten alkuperäisiä yksityiskohtia säilyttäen.',
      },
      pl: {
        title: 'Renowacja Kuchni Amsterdam',
        description:
          'Opróżnienie kuchni w Amsterdamie do kompletnej renowacji z zachowaniem oryginalnych detali.',
      },
      ar: {
        title: 'تجديد مطبخ أمستردام',
        description: 'تفريغ مطبخ في أمستردام للتجديد الكامل مع الحفاظ على التفاصيل الأصلية.',
      },
      zh: {
        title: '阿姆斯特丹厨房翻新',
        description: '阿姆斯特丹厨房的清理，进行全面翻新，同时保留原始细节。',
      },
      ja: {
        title: 'アムステルダムキッチンリノベーション',
        description:
          'オリジナルのディテールを保ちながら全面リノベーションするためのアムステルダムのキッチンの片付け。',
      },
      pt: {
        title: 'Renovação Cozinha Amsterdã',
        description:
          'Limpeza de uma cozinha em Amsterdã para renovação completa preservando os detalhes originais.',
      },
      tr: {
        title: 'Amsterdam Mutfak Renovasyonu',
        description:
          "Orijinal detayları korurken tam renovasyon için Amsterdam'da bir mutfağın temizlenmesi.",
      },
      ru: {
        title: 'Реновация Кухни Амстердам',
        description:
          'Демонтаж кухни в Амстердаме для полной реновации с сохранением оригинальных деталей.',
      },
    },
    project5: {
      nl: {
        title: 'Badkamer Verbouwing Rotterdam',
        description:
          'Sloop en renovatie van een badkamer in Rotterdam met verwijderen van oude tegels en sanitair.',
      },
      en: {
        title: 'Bathroom Renovation Rotterdam',
        description:
          'Demolition and renovation of a bathroom in Rotterdam including removal of old tiles and fixtures.',
      },
      fr: {
        title: 'Rénovation Salle de Bain Rotterdam',
        description:
          "Démolition et rénovation d'une salle de bain à Rotterdam incluant enlèvement des vieux carreaux et sanitaires.",
      },
      de: {
        title: 'Badezimmerrenovierung Rotterdam',
        description:
          'Abriss und Renovierung eines Badezimmers in Rotterdam einschließlich Entfernung alter Fliesen und Sanitäreinrichtungen.',
      },
      it: {
        title: 'Ristrutturazione Bagno Rotterdam',
        description:
          'Demolizione e ristrutturazione di un bagno a Rotterdam inclusa rimozione di vecchie piastrelle e sanitari.',
      },
      es: {
        title: 'Renovación Baño Róterdam',
        description:
          'Demolición y renovación de un baño en Róterdam incluyendo eliminación de azulejos viejos y accesorios.',
      },
      sv: {
        title: 'Badrumsrenovering Rotterdam',
        description:
          'Rivning och renovering av ett badrum i Rotterdam inklusive borttagning av gamla kakel och armaturer.',
      },
      fi: {
        title: 'Kylpyhuoneremontti Rotterdam',
        description:
          'Kylpyhuoneen purku ja remontti Rotterdamissa, mukaan lukien vanhojen laattojen ja kalusteiden poisto.',
      },
      pl: {
        title: 'Renowacja Łazienki Rotterdam',
        description:
          'Rozbiórka i renowacja łazienki w Rotterdamie, w tym usuwanie starych płytek i armatur.',
      },
      ar: {
        title: 'تجديد حمام روتردام',
        description: 'هدم وتجديد حمام في روتردام بما في ذلك إزالة البلاط القديم والتركيبات.',
      },
      zh: {
        title: '鹿特丹浴室翻新',
        description: '鹿特丹浴室的拆除和翻新，包括拆除旧瓷砖和固定装置。',
      },
      ja: {
        title: 'ロッテルダムバスルームリノベーション',
        description: '古いタイルと器具の撤去を含むロッテルダムのバスルームの解体とリノベーション。',
      },
      pt: {
        title: 'Renovação Banheiro Roterdã',
        description:
          'Demolição e renovação de um banheiro em Roterdã incluindo remoção de azulejos velhos e acessórios.',
      },
      tr: {
        title: 'Rotterdam Banyo Renovasyonu',
        description:
          "Eski fayansların ve armatürlerin kaldırılması dahil Rotterdam'da bir banyonun yıkımı ve renovasyonu.",
      },
      ru: {
        title: 'Реновация Ванной Роттердам',
        description:
          'Демонтаж и реновация ванной в Роттердаме, включая удаление старой плитки и сантехники.',
      },
    },
    project6: {
      nl: {
        title: 'Interieur Renovatie Utrecht',
        description:
          'Complete interieur renovatie van een woning in Utrecht met sloop van alle binnenwanden en vloeren.',
      },
      en: {
        title: 'Interior Renovation Utrecht',
        description:
          'Complete interior renovation of a home in Utrecht with demolition of all interior walls and floors.',
      },
      fr: {
        title: 'Rénovation Intérieure Utrecht',
        description:
          "Rénovation intérieure complète d'une maison à Utrecht avec démolition de tous les murs et sols intérieurs.",
      },
      de: {
        title: 'Innenrenovierung Utrecht',
        description:
          'Komplette Innenrenovierung eines Hauses in Utrecht mit Abriss aller Innenwände und Böden.',
      },
      it: {
        title: 'Ristrutturazione Interna Utrecht',
        description:
          'Ristrutturazione interna completa di una casa a Utrecht con demolizione di tutte le pareti e pavimenti interni.',
      },
      es: {
        title: 'Renovación Interior Utrecht',
        description:
          'Renovación interior completa de una vivienda en Utrecht con demolición de todas las paredes y suelos interiores.',
      },
      sv: {
        title: 'Invändig Renovering Utrecht',
        description:
          'Komplett invändig renovering av ett hus i Utrecht med rivning av alla invändiga väggar och golv.',
      },
      fi: {
        title: 'Sisäremontti Utrecht',
        description:
          'Täydellinen sisäremontti talossa Utrechtissä, kaikki sisäseinät ja lattiat purettuina.',
      },
      pl: {
        title: 'Renowacja Wnętrza Utrecht',
        description:
          'Kompletna renowacja wnętrza domu w Utrechcie z rozbiórką wszystkich ścian i podłóg wewnętrznych.',
      },
      ar: {
        title: 'تجديد داخلي أوترخت',
        description: 'تجديد داخلي كامل لمنزل في أوترخت مع هدم جميع الجدران والأرضيات الداخلية.',
      },
      zh: {
        title: '乌得勒支室内翻新',
        description: '乌得勒支住宅的完整室内翻新，拆除所有内墙和地板。',
      },
      ja: {
        title: 'ユトレヒト室内リノベーション',
        description: 'すべての内壁と床を解体したユトレヒトの住宅の完全な室内リノベーション。',
      },
      pt: {
        title: 'Renovação Interior Utrecht',
        description:
          'Renovação interior completa de uma residência em Utrecht com demolição de todas as paredes e pisos interiores.',
      },
      tr: {
        title: 'Utrecht İç Mekan Renovasyonu',
        description:
          "Tüm iç duvarların ve zeminlerin yıkımı ile Utrecht'te bir evin tam iç mekan renovasyonu.",
      },
      ru: {
        title: 'Реновация Интерьера Утрехт',
        description:
          'Полная реновация интерьера дома в Утрехте с демонтажем всех внутренних стен и полов.',
      },
    },
  },
}

// Full blog content with rich text structure
const blogContent = {
  anniversary: {
    nl: {
      title: '25 Jaar titaanbrekers: Ons Jubileum',
      excerpt:
        'titaanbrekers bestaat 25 jaar! Een kwart eeuw van professionele sloopwerkzaamheden, groei en innovatie in de bouwsector.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Dit jaar vieren wij een bijzondere mijlpaal: titaanbrekers bestaat 25 jaar! Wat begon als een klein familiebedrijf in 1999 is uitgegroeid tot een van de meest gerespecteerde sloopbedrijven van Nederland. In dit artikel blikken we terug op onze reis, delen we onze successen en kijken we vol enthousiasme naar de toekomst.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Hoe het allemaal begon', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'In 1999 startte oprichter Jan de Vries titaanbrekers vanuit zijn garage in Rotterdam. Met slechts een hamer, een beitel en een droom om kwalitatief hoogstaand sloopwerk te leveren, begon hij aan zijn avontuur. De eerste opdrachten waren bescheiden – kleine keukenslopen en badkamerrenovaties – maar de grondslag voor succes was gelegd.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Door hard werken, vakmanschap en een onwankelbare focus op veiligheid groeide het bedrijf gestaag. In 2005 behaalden wij ons VCA** certificaat, wat de deur opende naar grotere en complexere projecten. De jaren daarna zagen we een explosieve groei, waarbij we onze diensten uitbreidden naar selectieve sloop, asbestsanering en complete woningontruiming.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Mijlpalen en groei', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'De afgelopen 25 jaar hebben we talloze projecten succesvol afgerond. Van historische monumenten in het centrum van Amsterdam tot grote industriële complexen in het Rotterdamse havengebied – ons portfolio is divers en indrukwekkend. Enkele hoogtepunten:',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2005: Certificering VCA** en start professionele asbestsanering',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2010: Erkenning SC-530 voor gespecialiseerde asbestverwijdering',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2015: Landelijke uitbreiding met vestigingen door heel Nederland',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2020: Groei naar 50+ vakmensen en 100+ projecten per jaar',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2024: 500+ succesvol afgeronde projecten en 25-jarig jubileum',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Duurzaamheid als kernwaarde', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Een aspect waar we bijzonder trots op zijn is onze bijdrage aan duurzaamheid in de bouwsector. Waar mogelijk streven wij naar 100% recycling van sloopafval. Materialen zoals beton, metaal, hout en glas worden zorgvuldig gescheiden en hergebruikt. Dit niet alleen om milieuredenen, maar ook omdat wij geloven in de waarde van circulariteit.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Onze CO2-footprint minimaliseren we door efficiënte planning, moderne machines en het gebruik van milieuvriendelijke materialen. In 2023 hebben wij ISO 14001 certificering behaald, wat onze inzet voor milieumanagement bevestigt.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [
                { type: 'text', text: 'Ons team: het hart van titaanbrekers', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'De successen van de afgelopen 25 jaar hadden niet mogelijk zijn zonder ons geweldige team. Van ervaren projectleiders tot jonge talenten – onze mensen zijn onze grootste trots. Wij investeren continu in opleiding en ontwikkeling, zodat ons team altijd op de hoogte is van de nieuwste technieken en veiligheidsnormen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Veiligheid staat bij ons voorop. Elke medewerker doorloopt regelmatig trainingen en certificeringen. Wij geloven dat een veilige werkomgeving niet onderhandelbaar is en dit vertaalt zich in onze uitstekende veiligheidsstatistieken.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Dankwoord', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Wij willen graag iedereen bedanken die heeft bijgedragen aan dit succes: onze klanten voor het vertrouwen, onze medewerkers voor hun toewijding, en onze partners voor de prettige samenwerking. Zonder jullie was titaanbrekers niet geworden wat het vandaag is.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Op naar de volgende 25 jaar!', version: 1 }],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    en: {
      title: '25 Years of TitanBreakers: Our Anniversary',
      excerpt:
        'TitanBreakers is celebrating 25 years! A quarter century of professional demolition work, growth and innovation in the construction sector.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'This year we celebrate a special milestone: TitanBreakers is 25 years old! What started as a small family business in 1999 has grown into one of the most respected demolition companies in the Netherlands. In this article we look back on our journey, share our successes and look to the future with enthusiasm.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'How it all began', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'In 1999, founder Jan de Vries started TitanBreakers from his garage in Rotterdam. With only a hammer, a chisel and a dream to deliver high-quality demolition work, he began his adventure. The first assignments were modest – small kitchen demolitions and bathroom renovations – but the foundation for success was laid.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Through hard work, craftsmanship and an unwavering focus on safety, the company grew steadily. In 2005 we obtained our VCA** certificate, which opened the door to larger and more complex projects. The years that followed saw explosive growth, during which we expanded our services to include selective demolition, asbestos removal and complete property clearing.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Milestones and growth', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Over the past 25 years we have successfully completed countless projects. From historic monuments in the center of Amsterdam to large industrial complexes in the Rotterdam port area – our portfolio is diverse and impressive. Some highlights:',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2005: VCA** certification and start of professional asbestos removal',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2010: SC-530 recognition for specialized asbestos removal',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2015: National expansion with locations throughout the Netherlands',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2020: Growth to 50+ professionals and 100+ projects per year',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• 2024: 500+ successfully completed projects and 25th anniversary',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Sustainability as a core value', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'One aspect we are particularly proud of is our contribution to sustainability in the construction sector. Where possible, we strive for 100% recycling of demolition waste. Materials such as concrete, metal, wood and glass are carefully separated and reused. Not only for environmental reasons, but also because we believe in the value of circularity.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We minimize our CO2 footprint through efficient planning, modern machinery and the use of environmentally friendly materials. In 2023 we achieved ISO 14001 certification, confirming our commitment to environmental management.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [
                { type: 'text', text: 'Our team: the heart of TitanBreakers', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The successes of the past 25 years would not have been possible without our great team. From experienced project managers to young talents – our people are our greatest pride. We continuously invest in training and development, so that our team is always up to date with the latest techniques and safety standards.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Safety is our top priority. Every employee undergoes regular training and certifications. We believe that a safe working environment is non-negotiable and this is reflected in our excellent safety statistics.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Acknowledgments', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We would like to thank everyone who has contributed to this success: our customers for their trust, our employees for their dedication, and our partners for the pleasant cooperation. Without you, TitanBreakers would not have become what it is today.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: "Here's to the next 25 years!", version: 1 }],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    // Additional languages would follow the same pattern...
  },
  bathroom: {
    nl: {
      title: 'Badkamer Sloop: Best Practices en Tips',
      excerpt:
        'Ontdek de beste methoden voor het slopen van een badkamer. Van het verwijderen van tegels tot het afvoeren van sanitair – alles wat u moet weten.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Een badkamer slopen is een klus die veel mensen onderschatten. Het lijkt simpel – hamer erin en gaan – maar er komt veel meer bij kijken dan u misschien denkt. In dit artikel delen wij onze expertise en geven wij u waardevolle tips voor een succesvolle badkamersloop.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Voorbereiding is alles', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Voordat u begint met slopen, is een grondige voorbereiding essentieel. Dit bespaart u niet alleen tijd, maar ook geld en frustratie. Zorg ervoor dat u:',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Het water afsluit en de leidingen leeg laat lopen',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• De elektriciteit uitschakelt en verifieert dat er geen stroom loopt',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Beschermende kleding draagt: veiligheidsbril, werkhandschoenen en stevige schoenen',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• De ruimte goed ventileert', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Beschermende afdekking aanbrengt voor vloeren en meubels in aangrenzende ruimtes',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Stap-voor-stap aanpak', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Wij adviseren om systematisch te werk te gaan. Begin altijd met het verwijderen van losse onderdelen zoals spiegels, kastjes en accessoires. Vervolgens kunt u aan de slag met het sanitair: verwijder eerst het toilet, daarna de wastafel en als laatste de douche of het bad.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Bij het verwijderen van tegels is het belangrijk om te beginnen bij een hoek of rand. Gebruik een voegenfrees om de voegen te verwijderen en werk dan voorzichtig met een hamer en beitel. Let op: oude tegels kunnen broos zijn en onverwachts breken.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Asbest: een verborgen gevaar', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'In badkamers van voor 1994 kan asbest voorkomen, met name in kitvoegen, vloertegels en isolatiematerialen. Asbest is zeer schadelijk voor de gezondheid en mag alleen worden verwijderd door gecertificeerde professionals. Laat bij twijfel altijd een asbestinventarisatie uitvoeren voordat u begint met slopen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Afvalscheiding en duurzaamheid', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Een badkamersloop genereert veel afval. Door dit zorgvuldig te scheiden kunt u veel materialen laten recycleren. Beton en tegels kunnen worden verwerkt tot granulaat, metalen kunnen worden gesmolten en hergebruikt, en zelfs oude sanitair kan vaak worden gerecycled.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Bij titaanbrekers streven wij naar 98% recycling van alle sloopafval. Dit is niet alleen beter voor het milieu, maar kan ook kostenbesparend werken doordat afvalverwerkingskosten worden verminderd.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [
                { type: 'text', text: 'Wanneer schakelt u een professional in?', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Hoewel veel mensen zelf een badkamer slopen, zijn er situaties waarin het verstandig is om een professional in te schakelen. Denk aan:',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Aanwezigheid van asbest', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Grote badkamers of complexe situaties', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Behoud van specifieke elementen', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Tijdsdruk – professionals werken efficiënter',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: "• Veiligheidsrisico's", version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Met meer dan 25 jaar ervaring en duizenden succesvol afgeronde badkamerslopen staat titaanbrekers voor u klaar. Neem vrijblijvend contact met ons op voor advies of een offerte.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    en: {
      title: 'Bathroom Demolition: Best Practices and Tips',
      excerpt:
        'Discover the best methods for demolishing a bathroom. From removing tiles to disposing of sanitary ware – everything you need to know.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "Demolishing a bathroom is a job that many people underestimate. It seems simple – grab a hammer and go – but there's much more to it than you might think. In this article we share our expertise and give you valuable tips for a successful bathroom demolition.",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Preparation is everything', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Before you start demolishing, thorough preparation is essential. This will save you not only time but also money and frustration. Make sure you:',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Turn off the water and drain the pipes', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Switch off the electricity and verify that no current is flowing',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Wear protective clothing: safety goggles, work gloves and sturdy shoes',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Ventilate the space well', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Apply protective covering for floors and furniture in adjacent spaces',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Step-by-step approach', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We recommend working systematically. Always start by removing loose parts such as mirrors, cabinets and accessories. Then you can get to work on the sanitary ware: first remove the toilet, then the sink and finally the shower or bath.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "When removing tiles, it's important to start at a corner or edge. Use a joint cutter to remove the grout and then work carefully with a hammer and chisel. Note: old tiles can be brittle and break unexpectedly.",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Asbestos: a hidden danger', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'In bathrooms built before 1994, asbestos can be present, especially in sealant joints, floor tiles and insulation materials. Asbestos is very harmful to health and may only be removed by certified professionals. If in doubt, always have an asbestos survey carried out before you start demolishing.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Waste separation and sustainability', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'A bathroom demolition generates a lot of waste. By carefully separating it, you can have many materials recycled. Concrete and tiles can be processed into aggregate, metals can be melted down and reused, and even old sanitary ware can often be recycled.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'At TitanBreakers, we strive for 98% recycling of all demolition waste. This is not only better for the environment, but can also be cost-saving by reducing waste disposal costs.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [
                { type: 'text', text: 'When should you hire a professional?', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "While many people demolish their own bathrooms, there are situations where it's wise to hire a professional. Think about:",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Presence of asbestos', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Large bathrooms or complex situations', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Preservation of specific elements', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Time pressure – professionals work more efficiently',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Safety risks', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'With more than 25 years of experience and thousands of successfully completed bathroom demolitions, TitanBreakers is ready to help you. Feel free to contact us for advice or a quote.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
  },
  manual: {
    nl: {
      title: 'Handmatige vs Mechanische Sloop: Wanneer Wat?',
      excerpt:
        'Wanneer kies je voor handmatige sloop en wanneer voor mechanische sloop? Ontdek de voor- en nadelen van beide methoden.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Bij sloopwerkzaamheden staat vaak de vraag centraal: kiezen we voor handmatige sloop of mechanische sloop? Beide methoden hebben hun eigen toepassingen, voordelen en nadelen. In dit artikel helpen wij u bij het maken van de juiste keuze voor uw project.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Wat is handmatige sloop?', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Handmatige sloop is precies wat de naam suggereert: het verwijderen van structuren met handgereedschap zoals hamers, beitels, slijptollen en sloopstempels. Onze ervaren vakmensen werken nauwkeurig en hebben volledige controle over het proces.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Voordelen van handmatige sloop', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Maximale precisie en controle over het sloopproces',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Minimale kans op beschadiging van omliggende structuren',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Ideaal voor kleine ruimtes waar machines niet passen',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Betere sorteerbaarheid van afval voor recycling',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Minder geluidsoverlast en trillingen', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Geen vrachtwagenverkeer voor zware machines', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Nadelen van handmatige sloop', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Arbeidsintensiever en duurder bij grote projecten',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Langzamer dan mechanische sloop', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Fysiek zwaar werk voor het team', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Beperkte capaciteit voor grote volumes', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Wat is mechanische sloop?', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Mechanische sloop maakt gebruik van zware machines zoals graafmachines, sloopkraantjes en hydraulische hamers. Deze methode is zeer effectief voor grote projecten en het slopen van complete gebouwen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Voordelen van mechanische sloop', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Zeer snel en efficiënt bij grote volumes', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Kosteneffectief voor grote projecten', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Kan zware constructies en beton aan', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Minder arbeidskrachten nodig', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Geschikt voor complete gebouwen en bruggen', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Nadelen van mechanische sloop', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Vereist veel ruimte voor machines en manoeuvreren',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Meer geluidsoverlast en trillingen', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Minder precisie – hoger risico op beschadiging',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Niet geschikt voor binnenruimtes en krappe plekken',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Vrachtwagenverkeer voor transport zware machines',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'De beste keuze voor uw project', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Bij titaanbrekers zijn we gespecialiseerd in handmatige sloop voor interieurprojecten, renovaties en situaties waar precisie essentieel is. Denk aan keukenslopen, badkamers, winkelruimtes en kantoren waar machines niet of nauwelijks kunnen komen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Voor grote, open projecten werken wij samen met gespecialiseerde partners die mechanische sloop uitvoeren. Zo kunnen wij u altijd de beste oplossing bieden, afgestemd op uw specifieke situatie.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Twijfelt u welke methode het beste is voor uw project? Neem contact met ons op voor een vrijblijvend adviesgesprek. Met meer dan 25 jaar ervaring weten wij precies welke aanpak het beste resultaat geeft.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    en: {
      title: 'Manual vs Mechanical Demolition: When to Use What?',
      excerpt:
        'When do you choose manual demolition and when for mechanical demolition? Discover the pros and cons of both methods.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'When it comes to demolition work, the question often arises: do we choose manual demolition or mechanical demolition? Both methods have their own applications, advantages and disadvantages. In this article we help you make the right choice for your project.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'What is manual demolition?', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Manual demolition is exactly what the name suggests: removing structures with hand tools such as hammers, chisels, grinding tools and demolition chisels. Our experienced professionals work precisely and have complete control over the process.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Advantages of manual demolition', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Maximum precision and control over the demolition process',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "• Ideal for small spaces where machines don't fit",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Minimal risk of damage to surrounding structures',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Better waste sortability for recycling', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Less noise pollution and vibrations', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• No truck traffic for heavy machinery', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Disadvantages of manual demolition', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• More labor-intensive and more expensive for large projects',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Slower than mechanical demolition', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Physically demanding work for the team', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Limited capacity for large volumes', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'What is mechanical demolition?', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Mechanical demolition uses heavy machinery such as excavators, demolition cranes and hydraulic hammers. This method is very effective for large projects and demolishing entire buildings.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Advantages of mechanical demolition', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Very fast and efficient for large volumes', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Cost-effective for large projects', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Can handle heavy structures and concrete', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Fewer workers needed', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Suitable for complete buildings and bridges', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [
                { type: 'text', text: 'Disadvantages of mechanical demolition', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Requires a lot of space for machinery and maneuvering',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• More noise pollution and vibrations', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Less precision – higher risk of damage', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Not suitable for interior spaces and tight spots',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Truck traffic for transport of heavy machinery',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'The best choice for your project', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'At TitanBreakers we specialize in manual demolition for interior projects, renovations and situations where precision is essential. Think of kitchen demolitions, bathrooms, retail spaces and offices where machines cannot or can hardly reach.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'For large, open projects we work together with specialized partners who carry out mechanical demolition. This way we can always offer you the best solution, tailored to your specific situation.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Are you unsure which method is best for your project? Contact us for a no-obligation consultation. With more than 25 years of experience, we know exactly which approach delivers the best results.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
  },
  preparation: {
    nl: {
      title: 'Voorbereiding Voor Sloopwerkzaamheden',
      excerpt:
        'Goede voorbereiding is essentieel voor een succesvol sloopproject. Ontdek waar u op moet letten voordat de sloop begint.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Een succesvol sloopproject begint met een grondige voorbereiding. Of het nu gaat om een kleine badkamer of een groot industrieel complex, de voorbereidende werkzaamheden bepalen voor een groot deel het succes van het project. In dit artikel nemen wij u mee in de essentiële stappen die u moet doorlopen voordat de sloop begint.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Inventarisatie en inspectie', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "Voordat u begint met slopen, is het essentieel om een grondige inventarisatie te maken van het pand en de omgeving. Dit omvat het in kaart brengen van belangrijke zaken zoals de aanwezigheid van asbest, de staat van de fundering, en eventuele risico's voor omliggende gebouwen.",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Een professionele inspectie kan u helpen om potentiële problemen vroegtijdig te identificeren. Dit voorkomt verrassingen tijdens de sloop en zorgt ervoor dat u een realistisch tijdschema en budget kunt opstellen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Vergunningen en regelgeving', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Afhankelijk van de omvang en locatie van het project kan het nodig zijn om verschillende vergunningen aan te vragen. Dit kan variëren van een sloopvergunning tot milieuvergunningen. Zorg ervoor dat u op de hoogte bent van de lokale regelgeving en dat alle benodigde papieren op tijd zijn geregeld.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Het niet naleven van regelgeving kan leiden tot boetes, vertragingen of zelfs het stilleggen van het project. Investeer daarom tijd in het goed voorbereiden van de administratieve kant van het project.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Veiligheid eerst', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "Veiligheid moet altijd de hoogste prioriteit hebben bij sloopwerkzaamheden. Zorg ervoor dat er een gedetailleerd veiligheidsplan is opgesteld dat alle mogelijke risico's in kaart brengt en maatregelen beschrijft om deze te mitigeren.",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Afzetting van het werkterrein', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Bescherming van publiek en omgeving', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Persoonlijke beschermingsmiddelen (PBM)', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Noodprocedures en evacuatieplannen', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Logistieke planning', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Een goede logistieke planning is cruciaal voor een efficiënt sloopproject. Denk na over de aan- en afvoer van materialen, de routing van vrachtwagens, en de afzetting van het werkterrein. Zorg er ook voor dat er voldoende ruimte is voor het tijdelijk opslaan van sloopafval.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Met de juiste voorbereiding zorgt u voor een soepel verloop van het project en minimaliseert u de kans op verrassingen. Bij titaanbrekers helpen wij u graag bij het opstellen van een gedetailleerd plan voor uw sloopproject.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    en: {
      title: 'Preparation for Demolition Work',
      excerpt:
        'Good preparation is essential for a successful demolition project. Discover what you need to pay attention to before demolition begins.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "A successful demolition project starts with thorough preparation. Whether it's a small bathroom or a large industrial complex, the preparatory work largely determines the success of the project. In this article, we take you through the essential steps you need to go through before demolition begins.",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Inventory and inspection', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "Before you start demolishing, it's essential to make a thorough inventory of the building and its surroundings. This includes mapping out important matters such as the presence of asbestos, the condition of the foundation, and any risks to adjacent buildings.",
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'A professional inspection can help you identify potential problems early on. This prevents surprises during demolition and ensures that you can establish a realistic schedule and budget.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Permits and regulations', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Depending on the scope and location of the project, it may be necessary to apply for various permits. This can range from a demolition permit to environmental permits. Make sure you are aware of local regulations and that all necessary paperwork is arranged on time.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Safety first', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Safety must always be the top priority in demolition work. Ensure that a detailed safety plan is drawn up that maps out all possible risks and describes measures to mitigate them.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Logistical planning', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'With proper preparation, you ensure smooth project execution and minimize the chance of surprises. At TitanBreakers, we are happy to help you draw up a detailed plan for your demolition project.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
  },
  asbestos: {
    nl: {
      title: 'Asbest Verwijdering: Protocollen en Veiligheid',
      excerpt:
        'Asbest verwijdering vereist strikte protocollen. Ontdek hoe titaanbrekers veilig en gecertificeerd asbest verwijdert.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Asbest is een gevaarlijk materiaal dat tot 1994 veel werd gebruikt in de bouw. Het verwijderen ervan vereist specialistische kennis, strikte protocollen en gecertificeerde professionals. In dit artikel leggen wij uit hoe wij bij titaanbrekers asbest veilig verwijderen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Wat is asbest?', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Asbest is een verzamelnaam voor zes verschillende mineralen die van nature in de aarde voorkomen. Vanwege de vezelstructuur, hittebestendigheid en sterkte werd asbest jarenlang veel gebruikt in bouwmaterialen. Echter, wanneer asbestvezels vrijkomen en worden ingeademd, kunnen ze ernstige gezondheidsproblemen veroorzaken, waaronder longkanker en asbestose.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Herkennen van asbest', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Asbest is niet altijd eenvoudig te herkennen. Het kan voorkomen in diverse materialen zoals golfplaten, leidingisolatie, vloertegels, kitvoegen en spuitcement. Gebouwen die voor 1994 zijn gebouwd, hebben een verhoogde kans op asbesthoudende materialen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Het verwijderingsproces', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Als gecertificeerd asbestverwijderingsbedrijf volgen wij strikte protocollen:',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Asbestinventarisatie door gecertificeerd deskundige',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Melding bij gemeente en arbeidsinspectie', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Afzetting en ontsmetting van werkgebied', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Verwijdering door gecertificeerde professionals',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Veilig transport naar erkende stortplaats', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Eindinspectie en oplevering', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Onze medewerkers zijn allen gecertificeerd volgens de SC-530 norm en werken volgens de strengste veiligheidsprotocollen.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    en: {
      title: 'Asbestos Removal: Protocols and Safety',
      excerpt:
        'Asbestos removal requires strict protocols. Discover how TitanBreakers safely removes asbestos with certified procedures.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Asbestos is a dangerous material that was widely used in construction until 1994. Its removal requires specialized knowledge, strict protocols, and certified professionals. In this article, we explain how we at TitanBreakers safely remove asbestos.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'What is asbestos?', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Asbestos is a collective name for six different minerals that occur naturally in the earth. Due to its fiber structure, heat resistance, and strength, asbestos was widely used in building materials for many years. However, when asbestos fibers are released and inhaled, they can cause serious health problems, including lung cancer and asbestosis.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'The removal process', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'As a certified asbestos removal company, we follow strict protocols to ensure safe removal.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our employees are all certified according to the SC-530 standard and work according to the strictest safety protocols.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
  },
  sustainable: {
    nl: {
      title: 'Duurzaam Slopen: Onze Visie op Circulariteit',
      excerpt:
        'Duurzaamheid is een kernwaarde bij titaanbrekers. Wij zorgen voor 98% recycling van alle sloopmaterialen.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Bij titaanbrekers geloven wij dat sloop en duurzaamheid hand in hand kunnen gaan. Waar veel mensen denken aan puin en afval wanneer ze aan sloop denken, zien wij juist mogelijkheden voor hergebruik en recycling. In dit artikel delen wij onze visie op duurzaam slopen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Het probleem van bouwafval', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'De bouwsector is verantwoordelijk voor een groot deel van het totale afval in Nederland. Traditioneel belandt het grootste deel van dit afval op de stortplaats, wat zorgt voor milieubelasting en verspilling van waardevolle grondstoffen. Dit moet anders kunnen, vonden wij.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Onze aanpak', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Wij streven naar 98% recycling van alle sloopmaterialen. Dit betekent dat bijna alles wat wij slopen, een tweede leven krijgt. Beton wordt verwerkt tot granulaat voor nieuwe wegen, metalen worden gesmolten en hergebruikt, en hout kan na bewerking weer als bouwmateriaal dienen.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Voordelen van duurzaam slopen', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Minder belasting van het milieu', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Lagere afvalstortkosten', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Behoud van waardevolle grondstoffen', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Bijdrage aan circulariteit', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Betere CO2-prestatie', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Door te kiezen voor titaanbrekers kiest u niet alleen voor vakmanschap, maar ook voor een duurzame toekomst. Samen maken we de bouwsector groener!',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    en: {
      title: 'Sustainable Demolition: Our Vision on Circularity',
      excerpt:
        'Sustainability is a core value at TitanBreakers. We ensure 98% recycling of all demolition materials.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'At TitanBreakers, we believe that demolition and sustainability can go hand in hand. While many people think of rubble and waste when they think of demolition, we see opportunities for reuse and recycling. In this article, we share our vision on sustainable demolition.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'The problem of construction waste', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The construction sector is responsible for a large part of total waste. Traditionally, most of this waste ends up in landfills, causing environmental burden and wasting valuable raw materials. We believe this can be done differently.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Our approach', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We strive for 98% recycling of all demolition materials. This means that almost everything we demolish gets a second life. Concrete is processed into aggregate for new roads, metals are melted down and reused, and wood can serve again as building material after processing.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'By choosing TitanBreakers, you not only choose craftsmanship but also a sustainable future. Together we make the construction sector greener!',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
  },
  kitchen: {
    nl: {
      title: 'Keuken Sloop Gids: Alles Wat U Moet Weten',
      excerpt:
        'Een complete gids voor het slopen van uw keuken. Van voorbereiding tot uitvoering, ontdek hoe u dit het beste kunt aanpakken.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Het slopen van een keuken is een belangrijke stap in uw renovatieproject. Of u nu een complete makeover plant of alleen bepaalde elementen wilt vervangen, een grondige sloop legt de basis voor een succesvol resultaat. In deze gids nemen wij u mee door het complete proces van keukensloop.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Voorbereiding is essentieel', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Voordat u begint met het slopen van uw keuken, is een goede voorbereiding cruciaal. Dit voorkomt verrassingen en zorgt voor een soepel verloop van het project.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Schakel gas, water en elektriciteit af', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Verwijder alle losse items en apparatuur', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Bescherm vloeren en muren die behouden blijven',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Zorg voor adequate ventilatie', version: 1 }],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Het sloopproces', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Bij titaanbrekers werken wij systematisch en veilig. We beginnen altijd bij de bovenste elementen en werken naar beneden toe. Dit voorkomt beschadiging van reeds gesloopte delen en zorgt voor een efficiënt werktempo.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: 'Stapsgewijze aanpak', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '• Stap 1: Bovenkasten en wandelementen verwijderen',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Stap 2: Werkbladen en onderkasten slopen', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Stap 3: Vloeren en tegelwerk als laatste', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Veiligheid staat voorop', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Veiligheid is onze hoogste prioriteit. Onze vakmensen dragen altijd de juiste beschermingsmiddelen en volgen strikte veiligheidsprotocollen. We letten ook op het vrijkomen van gevaarlijke materialen zoals asbest in oude keukens.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Afvalverwerking en duurzaamheid', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Wij zorgen voor een duurzame afvoer van alle sloopmaterialen. Waar mogelijk scheiden we afvalstoffen voor recycling. Oude keukenapparatuur wordt op verantwoorde wijze afgevoerd volgens milieuwetgeving.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Met meer dan 25 jaar ervaring in keukensloop is titaanbrekers uw betrouwbare partner. Neem contact met ons op voor een vrijblijvende offerte en advies op maat.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
    en: {
      title: 'Kitchen Demolition Guide: Everything You Need to Know',
      excerpt:
        'A complete guide for demolishing your kitchen. From preparation to execution, discover how to best approach this project.',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Demolishing a kitchen is an important step in your renovation project. Whether you are planning a complete makeover or just want to replace certain elements, thorough demolition lays the foundation for a successful result. In this guide, we take you through the complete kitchen demolition process.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Preparation is essential', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Before you start demolishing your kitchen, good preparation is crucial. This prevents surprises and ensures a smooth project flow.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Turn off gas, water, and electricity', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Remove all loose items and appliances', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: '• Protect floors and walls that will remain', version: 1 },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{ type: 'text', text: '• Ensure adequate ventilation', version: 1 }],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'The demolition process', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'At TitanBreakers, we work systematically and safely. We always start with the upper elements and work our way down. This prevents damage to already demolished parts and ensures efficient work pace.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h3',
              children: [{ type: 'text', text: 'Step-by-step approach:', version: 1 }],
              version: 1,
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Upper cabinets and wall elements first',
                          version: 1,
                        },
                      ],
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        { type: 'text', text: 'Countertops and base cabinets next', version: 1 },
                      ],
                      version: 1,
                    },
                  ],
                  version: 1,
                },
                {
                  type: 'listitem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [{ type: 'text', text: 'Flooring and tiling last', version: 1 }],
                      version: 1,
                    },
                  ],
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Safety first', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Safety is our highest priority. Our professionals always wear the right protective equipment and follow strict safety protocols. We also pay attention to the release of dangerous materials such as asbestos in old kitchens.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Waste processing and sustainability', version: 1 }],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'We ensure sustainable disposal of all demolition materials. Where possible, we separate waste for recycling. Old kitchen appliances are disposed of responsibly according to environmental legislation.',
                  version: 1,
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'With more than 25 years of experience in kitchen demolition, TitanBreakers is your reliable partner. Contact us for a no-obligation quote and tailored advice.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          version: 1,
        },
      },
    },
  },
}

async function seed() {
  console.log('🌱 Starting complete database seed...')

  const payload = await getPayload({ config })

  try {
    await payload.db.connect()
    console.log('✅ Connected to database')

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...')
    await payload.db.deleteMany({ collection: 'services', req: {}, where: {} })
    await payload.db.deleteMany({ collection: 'projects', req: {}, where: {} })
    await payload.db.deleteMany({ collection: 'posts', req: {}, where: {} })
    console.log('✅ Cleared existing data')

    // Upload Images
    console.log('\n📸 Uploading images...')
    const uploadImage = async (filename, alt) => {
      const filePath = path.join(__dirname, '..', 'public', filename)
      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  Image not found: ${filename}`)
        return null
      }

      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ↻ Already exists: ${filename}`)
        return existing.docs[0]
      }

      const fileBuffer = fs.readFileSync(filePath)
      const file = {
        name: filename,
        data: fileBuffer,
        mimetype: `image/${filename.split('.').pop()}`,
        size: fileBuffer.length,
      }

      const media = await payload.create({
        collection: 'media',
        data: { alt },
        file,
      })
      console.log(`  ✓ Uploaded: ${filename} (ID: ${media.id})`)
      // Wait for blob metadata to persist
      await new Promise(r => setTimeout(r, 500))
      return media
    }

    const images = await Promise.all([
      uploadImage('hero-demolition.webp', 'TitanBreakers demolition equipment'),
      uploadImage('about-team.webp', 'TitanBreakers team'),
      uploadImage('project-1.webp', 'Demolition project 1'),
      uploadImage('project-2.webp', 'Demolition project 2'),
      uploadImage('project-3.webp', 'Demolition project 3'),
      uploadImage('project-4.webp', 'Demolition project 4'),
      uploadImage('project-5.webp', 'Demolition project 5'),
      uploadImage('project-6.webp', 'Demolition project 6'),
      uploadImage('blog-manual-demo.webp', 'Blog: Manual Demolition'),
      uploadImage('blog-asbestos-safety.webp', 'Blog: Asbestos Safety'),
      uploadImage('blog-kitchen-prep.webp', 'Blog: Kitchen Preparation'),
      uploadImage('blog-bathroom-tips.webp', 'Blog: Bathroom Tips'),
      uploadImage('blog-anniversary.webp', 'Blog: Anniversary'),
      uploadImage('blog-sustainable.webp', 'Blog: Sustainable Demolition'),
      uploadImage('service-asbestos.webp', 'Service: Asbestos'),
      uploadImage('service-property-clearing.webp', 'Service: Property Clearing'),
      uploadImage('service-manual.webp', 'Service: Manual Demolition'),
      uploadImage('service-selective.webp', 'Service: Selective Demolition'),
      uploadImage('service-kitchen-bathroom.webp', 'Service: Kitchen & Bathroom'),
      uploadImage('service-interior.webp', 'Service: Interior Demolition'),
    ])

    console.log('✅ Images uploaded')
    console.log(`  Total images: ${images.filter(i => i !== null).length}/${images.length}`)
    
    // Validate all required images uploaded
    const requiredImages = images.slice(14, 20)
    const failedUploads = requiredImages.filter(i => i === null)
    if (failedUploads.length > 0) {
      console.error(`❌ ${failedUploads.length} required service images failed to upload`)
      process.exit(1)
    }
    }

    // Seed Services with translations
    console.log('\n📦 Seeding Services with translations...')
    const serviceImages = {
      manual: images[16]?.id,
      selective: images[17]?.id,
      asbestos: images[14]?.id,
      clearing: images[15]?.id,
      kitchen: images[18]?.id,
      interior: images[19]?.id,
    }

    const services = [
      { key: 'manual', icon: 'Hammer', featured: true },
      { key: 'selective', icon: 'Scissors', featured: true },
      { key: 'asbestos', icon: 'Shield', featured: true },
      { key: 'clearing', icon: 'Trash2', featured: true },
      { key: 'kitchen', icon: 'Home', featured: false },
      { key: 'interior', icon: 'Building2', featured: false },
    ]

    for (const service of services) {
      const serviceData = {
        icon: service.icon,
        featured: service.featured,
        title: translations.services[service.key].nl.title,
        description: translations.services[service.key].nl.description,
      }

      const created = await payload.create({
        collection: 'services',
        data: serviceImages[service.key] ? { ...serviceData, image: serviceImages[service.key] } : serviceData,
      })

      // Add translations for all locales
      for (const locale of locales.filter((l) => l !== 'nl')) {
        const translation = translations.services[service.key][locale]
        if (translation) {
          await payload.update({
            collection: 'services',
            id: created.id,
            data: {
              title: translation.title,
              description: translation.description,
            },
            locale: locale,
            context: { disableRevalidate: true },
          })
        }
      }

      console.log(`  ✓ Service: ${serviceData.title}`)
    }
    console.log('✅ Services seeded with translations')

    // Seed Projects with translations
    console.log('\n📦 Seeding Projects with translations...')
    const projectKeys = ['project1', 'project2', 'project3', 'project4', 'project5', 'project6']
    const projectImages = [
      images[7]?.id, // project1: Winkelruimte Stripping -> project-6.webp
      images[5]?.id, // project2: Appartement Renovatie -> project-4.webp
      images[6]?.id, // project3: Woning Ontruiming -> project-5.webp
      images[2]?.id, // project4: Keuken Renovatie -> project-1.webp
      images[3]?.id, // project5: Badkamer Verbouwing -> project-2.webp
      images[4]?.id, // project6: Interieur Renovatie -> project-3.webp
    ]
    const projectDates = [
      new Date('2024-06-15').toISOString(),
      new Date('2024-03-20').toISOString(),
      new Date('2023-11-10').toISOString(),
      new Date('2023-09-05').toISOString(),
      new Date('2023-07-22').toISOString(),
      new Date('2022-12-15').toISOString(),
    ]
    const projectCategories = [
      'renovation',
      'renovation',
      'demolition',
      'renovation',
      'renovation',
      'renovation',
    ]

    for (let i = 0; i < projectKeys.length; i++) {
      const key = projectKeys[i]
      const projectData = {
        title: translations.projects[key].nl.title,
        description: translations.projects[key].nl.description,
        category: projectCategories[i],
        completed: projectDates[i],
        featured: true,
        image: projectImages[i],
      }

      const created = await payload.create({
        collection: 'projects',
        data: projectData,
      })

      // Add translations for all locales
      for (const locale of locales.filter((l) => l !== 'nl')) {
        const translation = translations.projects[key][locale]
        if (translation) {
          await payload.update({
            collection: 'projects',
            id: created.id,
            data: {
              title: translation.title,
              description: translation.description,
            },
            locale: locale,
            context: { disableRevalidate: true },
          })
        }
      }

      console.log(`  ✓ Project: ${projectData.title}`)
    }
    console.log('✅ Projects seeded with translations')

    // Seed Categories
    console.log('\n📦 Seeding Categories...')
    const categories = ['Demolition', 'Asbestos', 'Renovation', 'Environmental', 'News', 'Updates']

    for (const category of categories) {
      try {
        await payload.create({
          collection: 'categories',
          data: { title: category, slug: category.toLowerCase() },
        })
        console.log(`  ✓ Category: ${category}`)
      } catch (e) {
        console.log(`  ↻ Category exists: ${category}`)
      }
    }
    console.log('✅ Categories seeded')

    // Seed Blog Posts with rich content
    console.log('\n📦 Seeding Blog Posts with full content...')

    const blogPosts = [
      {
        key: 'anniversary',
        slug: '25-jaar-titanbrekers',
        image: images[12]?.id,
        date: new Date('2024-01-15').toISOString(),
      },
      {
        key: 'bathroom',
        slug: 'badkamer-sloop-best-practices',
        image: images[11]?.id,
        date: new Date('2024-01-08').toISOString(),
      },
      {
        key: 'manual',
        slug: 'handmatige-vs-mechanische-sloop',
        image: images[8]?.id,
        date: new Date('2023-12-20').toISOString(),
      },
      {
        key: 'kitchen',
        slug: 'keuken-sloop-gids',
        image: images[17]?.id,
        date: new Date('2023-12-10').toISOString(),
      },
      {
        key: 'sustainable',
        slug: 'duurzaam-sloopwerk',
        image: images[13]?.id,
        date: new Date('2023-11-28').toISOString(),
      },
      {
        key: 'asbestos',
        slug: 'asbest-verwijdering-veiligheid',
        image: images[9]?.id,
        date: new Date('2023-11-15').toISOString(),
      },
    ]

    for (const post of blogPosts) {
      const postData = blogContent[post.key].nl

      const created = await payload.create({
        collection: 'posts',
        data: {
          title: postData.title,
          slug: post.slug,
          _status: 'published',
          publishedAt: post.date,
          populatedAuthors: [],
          heroImage: post.image,
          content: postData.content,
          meta: {
            title: postData.title,
            description: postData.excerpt,
          },
        },
        context: { disableRevalidate: true },
      })

      // Add translations for all other locales that have valid content
      for (const locale of locales.filter((l) => l !== 'nl')) {
        // Check both blogContent and blogTranslations
        let localeData = blogContent[post.key][locale]

        // If not found in blogContent, check blogTranslations
        if (!localeData && blogTranslations[locale] && blogTranslations[locale][post.key]) {
          localeData = blogTranslations[locale][post.key]
        }

        // Only seed if we have valid content with proper structure
        if (
          localeData &&
          localeData.content &&
          localeData.content.root &&
          localeData.content.root.children &&
          localeData.content.root.children.length > 0
        ) {
          await payload.update({
            collection: 'posts',
            id: created.id,
            data: {
              title: localeData.title,
              content: localeData.content,
              meta: {
                title: localeData.title,
                description: localeData.excerpt,
              },
            },
            locale: locale,
            context: { disableRevalidate: true },
          })
        }
      }

      console.log(`  ✓ Blog Post: ${postData.title}`)
    }
    console.log('✅ Blog posts seeded')

    console.log('\n🎉 Database fully seeded with translations!')
    console.log('\n📋 Seeded:')
    console.log('✅ Images uploaded')
    console.log(`  Total images: ${images.filter(i => i !== null).length}/${images.length}`)
    
    // Validate all required images uploaded
    const requiredImages = images.slice(14, 20)
    const failedUploads = requiredImages.filter(i => i === null)
    if (failedUploads.length > 0) {
      console.error(`❌ ${failedUploads.length} required service images failed to upload`)
      process.exit(1)
    }
    
    // Validate all required images uploaded
    const requiredImages = images.slice(14, 20)
    const failedUploads = requiredImages.filter(i => i === null)
    if (failedUploads.length > 0) {
      console.error(`❌ ${failedUploads.length} required service images failed to upload`)
      process.exit(1)
    }
    console.log('  ✅ 6 Services (all 15 locales)')
    console.log('  ✅ 6 Projects (all 15 locales)')
    console.log('  ✅ 6 Categories')
    console.log('  ✅ 6 Blog Posts (NL + EN with full content)')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  }
}

seed()
