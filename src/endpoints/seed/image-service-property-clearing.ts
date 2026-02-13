import type { Media } from '@/payload-types'

export const serviceImagePropertyClearing: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Property Clearing Service',
}
