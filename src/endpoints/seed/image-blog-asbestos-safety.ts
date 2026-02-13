import type { Media } from '@/payload-types'

export const blogImageAsbestosSafety: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Asbestos Safety',
}
