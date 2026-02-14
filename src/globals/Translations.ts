import { type GlobalConfig } from 'payload'

export const Translations: GlobalConfig = {
  slug: 'translations',
  label: 'Translations',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'translations',
      type: 'array',
      label: 'Translations',
      fields: [
        {
          name: 'locale',
          type: 'select',
          label: 'Language',
          required: true,
          options: [
            { label: 'Nederlands', value: 'nl' },
            { label: 'English', value: 'en' },
            { label: 'Français', value: 'fr' },
            { label: 'Deutsch', value: 'de' },
            { label: 'Italiano', value: 'it' },
            { label: 'Español', value: 'es' },
            { label: 'Svenska', value: 'sv' },
            { label: 'Suomi', value: 'fi' },
            { label: 'Polski', value: 'pl' },
            { label: 'العربية', value: 'ar' },
            { label: '中文', value: 'zh' },
            { label: '日本語', value: 'ja' },
            { label: 'Português', value: 'pt' },
            { label: 'Türkçe', value: 'tr' },
            { label: 'Русский', value: 'ru' },
          ],
        },
        {
          name: 'strings',
          type: 'json',
          label: 'Translation Strings',
        },
      ],
    },
  ],
}
