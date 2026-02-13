import type { Media } from '@/payload-types'

export const blogImageSustainable: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Sustainable Demolition',
}
