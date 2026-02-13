import type { Media } from '@/payload-types'

export const blogImageManualDemo: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Manual Demolition Benefits',
}
