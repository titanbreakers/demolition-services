import type { Media } from '@/payload-types'

export const projectImage1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Kitchen Renovation Amsterdam',
}
