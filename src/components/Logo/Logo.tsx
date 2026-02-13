import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import type { Locale } from '@/utilities/translations'
import { translations } from '@/utilities/translations'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props
  const [locale, setLocale] = useState<Locale>('nl')

  useEffect(() => {
    const storedLang = localStorage.getItem('locale') as Locale
    if (storedLang && (storedLang === 'nl' || storedLang === 'en')) {
      setLocale(storedLang)
    }
  }, [])

  const t = translations[locale as keyof typeof translations] as any
  const companyName = t?.company?.name || 'titaanbrekers'

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div className="w-10 h-10 bg-primary flex items-center justify-center">
        <span className="font-display text-2xl text-primary-foreground font-bold">T</span>
      </div>
      <span className="font-display text-2xl tracking-wider text-foreground">
        {companyName === 'titaanbrekers' ? (
          <>
            <span>titaan</span>
            <span className="text-primary">brekers</span>
          </>
        ) : (
          <>
            <span>titan</span>
            <span className="text-primary">breakers</span>
          </>
        )}
      </span>
    </div>
  )
}
