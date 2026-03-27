import { getPayload } from 'payload'
import config from '@payload-config'

async function migrate() {
  const payload = await getPayload({ config })
  
  // Connect to database - this will create tables
  await payload.db.connect()
  
  console.log('Database tables created successfully!')
  
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
