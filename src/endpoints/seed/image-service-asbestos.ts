import type { Media } from '@/payload-types'

export const serviceImageAsbestos: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Asbestos Removal Service',
}
