'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Language {
  code: string
  label: string
  flag: string
}

const languages: Language[] = [
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
]

// Public URL paths for each locale (what users see in the browser)
const publicPaths: Record<string, Record<string, string>> = {
  nl: {
    home: '/',
    services: '/diensten',
    projects: '/projecten',
    blog: '/nieuws',
    about: '/over-ons',
    contact: '/contact',
  },
  en: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  fr: {
    home: '/',
    services: '/services',
    projects: '/projets',
    blog: '/actualites',
    about: '/a-propos',
    contact: '/contact',
  },
  de: {
    home: '/',
    services: '/leistungen',
    projects: '/projekte',
    blog: '/neuigkeiten',
    about: '/ueber-uns',
    contact: '/kontakt',
  },
  it: {
    home: '/',
    services: '/servizi',
    projects: '/progetti',
    blog: '/notizie',
    about: '/chi-siamo',
    contact: '/contatti',
  },
  es: {
    home: '/',
    services: '/servicios',
    projects: '/proyectos',
    blog: '/noticias',
    about: '/nosotros',
    contact: '/contacto',
  },
  sv: {
    home: '/',
    services: '/tjanster',
    projects: '/projekt',
    blog: '/nyheter',
    about: '/om-oss',
    contact: '/kontakt',
  },
  fi: {
    home: '/',
    services: '/palvelut',
    projects: '/projektit',
    blog: '/uutiset',
    about: '/meista',
    contact: '/yhteystiedot',
  },
  pl: {
    home: '/',
    services: '/uslugi',
    projects: '/projekty',
    blog: '/aktualnosci',
    about: '/o-nas',
    contact: '/kontakt',
  },
  ar: {
    home: '/',
    services: '/الخدمات',
    projects: '/المشاريع',
    blog: '/الأخبار',
    about: '/من-نحن',
    contact: '/اتصل-بنا',
  },
  zh: {
    home: '/',
    services: '/服务',
    projects: '/项目',
    blog: '/新闻',
    about: '/关于我们',
    contact: '/联系我们',
  },
  ja: {
    home: '/',
    services: '/サービス',
    projects: '/プロジェクト',
    blog: '/ニュース',
    about: '/会社概要',
    contact: '/お問い合わせ',
  },
  pt: {
    home: '/',
    services: '/servicos',
    projects: '/projetos',
    blog: '/noticias',
    about: '/sobre-nos',
    contact: '/contato',
  },
  tr: {
    home: '/',
    services: '/hizmetler',
    projects: '/projeler',
    blog: '/haberler',
    about: '/hakkimizda',
    contact: '/iletisim',
  },
  ru: {
    home: '/',
    services: '/uslugi',
    projects: '/proekty',
    blog: '/novosti',
    about: '/o-nas',
    contact: '/kontakty',
  },
}

// Create a reverse mapping from any path to route key
// This allows matching paths from any language to determine the route
const pathToRouteKey: Record<string, string> = {}
Object.entries(publicPaths).forEach(([, paths]) => {
  Object.entries(paths).forEach(([key, path]) => {
    pathToRouteKey[path] = key
  })
})

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<string>('nl')
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Get locale from URL path
    const pathParts = pathname.split('/').filter(Boolean)
    const urlLocale = pathParts[0]

    if (urlLocale && languages.some((l) => l.code === urlLocale)) {
      setCurrentLang(urlLocale)
    } else {
      // Fallback to cookie or localStorage
      const cookieLang = document.cookie
        .split('; ')
        .find((row) => row.startsWith('locale='))
        ?.split('=')[1]
      const storedLang = cookieLang || localStorage.getItem('locale') || 'nl'
      setCurrentLang(storedLang)
    }
  }, [pathname])

  const handleLanguageChange = useCallback(
    (langCode: string) => {
      if (langCode === currentLang) return

      // Save current scroll position before navigation
      const scrollPosition = window.scrollY
      sessionStorage.setItem('scrollPosition', String(scrollPosition))

      // Set cookie for server-side access
      document.cookie = `locale=${langCode}; path=/; max-age=31536000; SameSite=Lax`
      localStorage.setItem('locale', langCode)

      // Get the current public path (without locale prefix)
      const pathParts = pathname.split('/').filter(Boolean)
      const currentLocale = pathParts[0]
      const currentPublicPath = '/' + pathParts.slice(1).join('/') || '/'

      // Detect special dynamic routes that need slug translation
      const isBlogPost = currentPublicPath.match(
        /^\/(nieuws|blog|actualites|neuigkeiten|notizie|noticias|nyheter|uutiset|aktualnosci|akhbar|xinwen|nyusu|novosti|haberler)\/.+/,
      )
      const isProject = currentPublicPath.match(/^\/(projecten|projects)\/.+/)
      const isService = currentPublicPath.match(/^\/(diensten|services)\/.+/)
      const isPage =
        currentPublicPath.match(/^\/[^/]+$/) &&
        ![
          'nieuws',
          'blog',
          'actualites',
          'neuigkeiten',
          'notizie',
          'noticias',
          'nyheter',
          'uutiset',
          'aktualnosci',
          'akhbar',
          'xinwen',
          'nyusu',
          'novosti',
          'haberler',
          'projecten',
          'projects',
          'diensten',
          'services',
          'over-ons',
          'about',
          'contact',
        ].includes(pathParts[1])

      // For dynamic content pages (blog posts, projects, services, pages),
      // redirect to the list page since slug translation isn't implemented
      if (isBlogPost) {
        const newPaths = publicPaths[langCode] || publicPaths['nl']
        const newPathname = `/${langCode}${newPaths.blog}`
        router.push(newPathname)
        return
      }

      if (isProject) {
        const newPaths = publicPaths[langCode] || publicPaths['nl']
        const newPathname = `/${langCode}${newPaths.projects}`
        router.push(newPathname)
        return
      }

      if (isService) {
        const newPaths = publicPaths[langCode] || publicPaths['nl']
        const newPathname = `/${langCode}${newPaths.services}`
        router.push(newPathname)
        return
      }

      // Find which route key corresponds to the current public path
      // Use reverse mapping to match paths from any language
      const routeKey = pathToRouteKey[currentPublicPath] || 'home'

      // Get the new public path for the target locale
      const newPaths = publicPaths[langCode] || publicPaths['nl']
      const newPublicPath = newPaths[routeKey] || currentPublicPath

      // Construct new URL
      const newPathname = `/${langCode}${newPublicPath}`

      // Navigate to the translated URL
      router.push(newPathname)
    },
    [currentLang, pathname, router],
  )

  // Restore scroll position after navigation
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition')
    if (savedPosition) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10))
        sessionStorage.removeItem('scrollPosition')
      }, 100)
    }
  }, [pathname])

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm">
        <span className="text-lg">🇳🇱</span>
        <span className="hidden sm:inline uppercase">nl</span>
      </div>
    )
  }

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto border-0 bg-transparent hover:bg-accent focus:ring-0 focus:ring-offset-0 px-2 gap-2">
        <span className="text-lg" role="img" aria-label={currentLanguage.label}>
          {currentLanguage.flag}
        </span>
        <span className="hidden sm:inline text-sm font-medium uppercase">
          {currentLanguage.code}
        </span>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[160px]">
        {languages.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-lg" role="img" aria-label={language.label}>
                {language.flag}
              </span>
              <span className="flex-1">{language.label}</span>
              {currentLang === language.code && <Check className="h-4 w-4 text-primary" />}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
