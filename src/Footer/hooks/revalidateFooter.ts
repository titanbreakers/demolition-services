import type { GlobalAfterChangeHook } from 'payload'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    // Dynamic import to avoid build errors in client components
    import('next/cache')
      .then(({ revalidateTag }) => {
        revalidateTag('global_footer')
      })
      .catch((err) => {
        console.error('Failed to import revalidateTag:', err)
      })
  }

  return doc
}
