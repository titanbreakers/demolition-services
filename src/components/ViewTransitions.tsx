'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function ViewTransitions() {
  const router = useRouter()
  const isTransitioning = useRef(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      // Find the closest anchor element
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      // Skip if no anchor, external links, or special links
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Check for external or special links
      if (
        anchor.target ||
        anchor.hasAttribute('download') ||
        anchor.getAttribute('rel') === 'external' ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        (href.startsWith('http') && !href.startsWith(window.location.origin))
      ) {
        return
      }

      // Don't intercept same-page links
      if (href === window.location.pathname) return

      // Don't intercept if already transitioning
      if (isTransitioning.current) return

      // Prevent default navigation
      e.preventDefault()
      isTransitioning.current = true

      // Use View Transitions API if available
      if (document.startViewTransition) {
        const transition = document.startViewTransition(() => {
          router.push(href)
        })

        transition.finished
          .then(() => {
            isTransitioning.current = false
          })
          .catch(() => {
            isTransitioning.current = false
          })
      } else {
        // Fallback for browsers without View Transitions
        router.push(href)
        setTimeout(() => {
          isTransitioning.current = false
        }, 100)
      }
    },
    [router],
  )

  useEffect(() => {
    // Use capture phase to catch events early
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [handleClick])

  return null
}
