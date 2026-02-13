import type { Media } from '@/payload-types'

export const blogImageKitchenPrep: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Kitchen Renovation Prep',
}
