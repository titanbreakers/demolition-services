import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DienstenClient from './page.client'

export default async function Diensten() {
  let pageData: any = null
  let servicesData: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch the services page global data
    pageData = await payload.findGlobal({
      slug: 'services-page',
    })

    // Fetch the actual services from the collection
    const services = await payload.find({
      collection: 'services',
      sort: 'featured DESC, title ASC',
      depth: 1, // Populate images
    })

    servicesData = services.docs || []
  } catch (error) {
    console.error('Error fetching services data:', error)
  }

  return <DienstenClient pageData={pageData} services={servicesData} />
}
