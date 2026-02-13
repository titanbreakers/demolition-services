import type { Media } from '@/payload-types'

export const blogImageBathroomTips: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Bathroom Demo Tips',
}
