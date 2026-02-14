'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type TranslationKeys = Record<string, string | TranslationKeys>

interface I18nContextType {
  t: TranslationKeys
  locale: string
  setLocale: (locale: string) => void
  loading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const TRANSLATIONS_CACHE: Map<string, TranslationKeys> = new Map()

export function I18nProvider({
  children,
  initialLocale = 'nl',
}: {
  children: ReactNode
  initialLocale?: string
}) {
  const [locale, setLocaleState] = useState(initialLocale)
  const [translations, setTranslations] = useState<TranslationKeys>({})
  const [loading, setLoading] = useState(true)

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  useEffect(() => {
    const stored = localStorage.getItem('locale')
    if (stored) {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    async function loadTranslations() {
      setLoading(true)

      if (TRANSLATIONS_CACHE.has(locale)) {
        setTranslations(TRANSLATIONS_CACHE.get(locale)!)
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/translations?locale=${locale}`)
        if (res.ok) {
          const data = await res.json()
          setTranslations(data)
          TRANSLATIONS_CACHE.set(locale, data)
        }
      } catch (error) {
        console.error('Failed to load translations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTranslations()
  }, [locale])

  const getNestedValue = (obj: TranslationKeys, path: string): unknown => {
    const keys = path.split('.')
    let current: unknown = obj

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key]
      } else {
        return null
      }
    }

    return current
  }

  const t = new Proxy({} as TranslationKeys, {
    get(_, path: string) {
      const value = getNestedValue(translations, path)
      if (value === null) {
        if (path === 'paths') return {}
        return ''
      }
      if (typeof value === 'object') return value
      if (typeof value === 'string') return value
      return ''
    },
  })

  const value: I18nContextType = {
    t,
    locale,
    setLocale,
    loading,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function useTranslation() {
  const { t, locale, setLocale, loading } = useI18n()

  return {
    t,
    locale,
    setLocale,
    loading,
    isLoading: loading,
  }
}
