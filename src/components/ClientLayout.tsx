'use client'

import { ViewTransitions } from '@/components/ViewTransitions'
import { ReactNode } from 'react'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ViewTransitions />
      {children}
    </>
  )
}
