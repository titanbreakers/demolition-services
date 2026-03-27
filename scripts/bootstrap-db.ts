import { Pool } from 'pg'

async function bootstrap() {
  console.log('🔧 Bootstrapping database...')
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  try {
    // Create payload_migrations table first
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "payload_migrations" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "batch" INTEGER NOT NULL,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✅ Created payload_migrations table')
    
    // Create collections table for tracking
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "payload_preferences" (
        "id" SERIAL PRIMARY KEY,
        "key" VARCHAR(255),
        "value" JSONB,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT NOW()
      )
    `)
    console.log('✅ Created payload_preferences table')
    
    console.log('✅ Database bootstrapped!')
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Bootstrap failed:', error.message)
    process.exit(1)
  }
}

bootstrap()
