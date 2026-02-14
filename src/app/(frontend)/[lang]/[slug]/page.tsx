import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Args = {
  params: Promise<{
    lang: string
    slug?: string
  }>
}

const pathToSlugMap: Record<string, Record<string, string>> = {
  nl: {
    diensten: 'diensten',
    projecten: 'projecten',
    nieuws: 'nieuws',
    'over-ons': 'over-ons',
    contact: 'contact',
    home: 'home',
  },
  en: {
    services: 'diensten',
    projects: 'projecten',
    blog: 'nieuws',
    about: 'over-ons',
    contact: 'contact',
    home: 'home',
  },
  fr: {
    services: 'diensten',
    projets: 'projecten',
    actualites: 'nieuws',
    'a-propos': 'over-ons',
    contact: 'contact',
    home: 'home',
  },
  de: {
    leistungen: 'diensten',
    projekte: 'projecten',
    neuigkeiten: 'nieuws',
    'ueber-uns': 'over-ons',
    kontakt: 'contact',
    home: 'home',
  },
  it: {
    servizi: 'diensten',
    progetti: 'projecten',
    notizie: 'nieuws',
    'chi-siamo': 'over-ons',
    contatti: 'contact',
    home: 'home',
  },
  es: {
    servicios: 'diensten',
    proyectos: 'projecten',
    noticias: 'nieuws',
    nosotros: 'over-ons',
    contacto: 'contact',
    home: 'home',
  },
  sv: {
    tjanster: 'diensten',
    projekt: 'projecten',
    nyheter: 'nieuws',
    'om-oss': 'over-ons',
    kontakt: 'contact',
    home: 'home',
  },
  fi: {
    palvelut: 'diensten',
    projektit: 'projecten',
    uutiset: 'nieuws',
    meista: 'over-ons',
    yhteys: 'contact',
    home: 'home',
  },
  pl: {
    uslugi: 'diensten',
    projekty: 'projecten',
    aktualnosci: 'nieuws',
    'o-nas': 'over-ons',
    kontakt: 'contact',
    home: 'home',
  },
  ar: {
    alkhdm: 'diensten',
    mahdt: 'projecten',
    akhbar: 'nieuws',
    ana: 'over-ons',
    tatsel: 'contact',
    home: 'home',
  },
  zh: {
    fuwu: 'diensten',
    xiangmu: 'projecten',
    xinwen: 'nieuws',
    guanyu: 'over-ons',
    lianxi: 'contact',
    home: 'home',
  },
  ja: {
    saabisu: 'diensten',
    purojekuto: 'projecten',
    nyuusu: 'nieuws',
    kaishame: 'over-ons',
    renrakus: 'contact',
    home: 'home',
  },
  pt: {
    servicos: 'diensten',
    projetos: 'projecten',
    noticias: 'nieuws',
    sobre: 'over-ons',
    contacto: 'contact',
    home: 'home',
  },
  tr: {
    hizmetler: 'diensten',
    projeler: 'projecten',
    haberler: 'nieuws',
    hakkimizda: 'over-ons',
    iletisim: 'contact',
    home: 'home',
  },
  ru: {
    uslugi: 'diensten',
    proekty: 'projecten',
    novosti: 'nieuws',
    'o-nas': 'over-ons',
    kontakt: 'contact',
    home: 'home',
  },
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { lang, slug = 'home' } = await paramsPromise

  const decodedSlug = decodeURIComponent(slug)
  const internalSlug = pathToSlugMap[lang]?.[decodedSlug] || decodedSlug
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: internalSlug,
    locale: lang,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <>
      <Header />
      <article className="pt-16 pb-24">
        <PageClient />
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
      </article>
      <Footer />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { lang, slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const internalSlug = pathToSlugMap[lang]?.[decodedSlug] || decodedSlug
  const page = await queryPageBySlug({
    slug: internalSlug,
    locale: lang,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
