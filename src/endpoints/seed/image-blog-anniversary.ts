import type { Media } from '@/payload-types'

export const blogImageAnniversary: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: '25 Year Anniversary',
}
