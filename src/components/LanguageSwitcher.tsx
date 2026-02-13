'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Check, ChevronDown } from 'lucide-react'
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
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  de: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  it: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  es: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  sv: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  fi: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  pl: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  ar: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  zh: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  ja: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  pt: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  tr: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
  ru: {
    home: '/',
    services: '/services',
    projects: '/projects',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
  },
}

// Internal path names (the actual folder structure in app/)
const internalPaths: Record<string, string> = {
  home: '/',
  services: '/diensten',
  projects: '/projecten',
  blog: '/nieuws',
  about: '/over-ons',
  contact: '/contact',
}

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
      let routeKey: keyof typeof internalPaths = 'home'
      const currentPaths = publicPaths[currentLocale] || publicPaths['nl']

      for (const [key, path] of Object.entries(currentPaths)) {
        if (path === currentPublicPath) {
          routeKey = key as keyof typeof internalPaths
          break
        }
      }

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
