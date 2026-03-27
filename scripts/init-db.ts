import { getPayload } from 'payload'
import config from '@payload-config'

async function initDB() {
  console.log('🔧 Initializing database schema...')
  
  const payload = await getPayload({ config })
  
  try {
    // Connect to DB - this creates tables in PostgreSQL
    await (payload.db.connect as any)()
    console.log('✅ Database connected and schema created!')
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Database initialization failed:', error.message)
    process.exit(1)
  }
}

initDB()
