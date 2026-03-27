import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteSettings } from './globals/SiteSettings'
import { AboutPage } from './globals/AboutPage'
import { ServicesPage } from './globals/ServicesPage'
import { ContactPage } from './globals/ContactPage'
import { HomePage } from './globals/HomePage'
import { Translations } from './globals/Translations'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db:
    process.env.DATABASE_URL?.startsWith('postgres://') ||
    process.env.DATABASE_URL?.startsWith('postgresql://')
      ? postgresAdapter({
          pool: {
            connectionString: process.env.DATABASE_URL || '',
          },
        })
      : mongooseAdapter({
          url: process.env.DATABASE_URL || '',
        }),
  collections: [Pages, Posts, Media, Categories, Users, Services, Projects],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header,
    Footer,
    SiteSettings,
    HomePage,
    AboutPage,
    ServicesPage,
    ContactPage,
    Translations,
  ],
  localization: {
    locales: [
      {
        code: 'nl',
        label: 'Nederlands',
      },
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'fr',
        label: 'Français',
      },
      {
        code: 'de',
        label: 'Deutsch',
      },
      {
        code: 'it',
        label: 'Italiano',
      },
      {
        code: 'es',
        label: 'Español',
      },
      {
        code: 'sv',
        label: 'Svenska',
      },
      {
        code: 'fi',
        label: 'Suomi',
      },
      {
        code: 'pl',
        label: 'Polski',
      },
      {
        code: 'ar',
        label: 'العربية',
      },
      {
        code: 'zh',
        label: '中文',
      },
      {
        code: 'ja',
        label: '日本語',
      },
      {
        code: 'pt',
        label: 'Português',
      },
      {
        code: 'tr',
        label: 'Türkçe',
      },
      {
        code: 'ru',
        label: 'Русский',
      },
    ],
    defaultLocale: 'nl',
    fallback: true,
  },
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
