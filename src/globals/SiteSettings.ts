import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'TitanBrekers',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Professioneel Sloopwerk met Kracht en Precisie',
    },
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'letter',
          type: 'text',
          defaultValue: 'T',
          admin: {
            description: 'Letter shown in logo square (e.g., T for TitanBrekers)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional logo image (if not set, letter logo will be used)',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '06-12345678',
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@titaanbrekers.nl',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: 'Industrieweg 45\n1234 AB Rotterdam',
        },
        {
          name: 'hours',
          type: 'textarea',
          defaultValue: 'Maandag - Vrijdag: 07:00 - 18:00\nZaterdag: Op afspraak',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      defaultValue: [
        { name: 'VCA**' },
        { name: 'SC-530' },
        { name: 'ISO 9001' },
        { name: 'ISO 14001' },
      ],
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
