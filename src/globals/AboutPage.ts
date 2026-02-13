import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Over Ons Page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'WIE ZIJN WIJ',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Al meer dan 25 jaar is TitanBrekers dé specialist in professioneel sloopwerk. Met passie, vakmanschap en moderne apparatuur maken wij ruimte voor de toekomst.',
          localized: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Background Image',
          admin: {
            description:
              'Background image for the hero section (e.g., team photo or work environment)',
          },
        },
      ],
    },
    {
      name: 'story',
      type: 'group',
      label: 'Our Story Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'ONS VERHAAL',
          localized: true,
        },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      label: 'Company Values',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Lucide icon name (e.g., Shield, Target, Heart, Users)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Company Timeline',
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
