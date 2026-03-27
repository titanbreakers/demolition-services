import { Pool } from 'pg'

async function createTables() {
  console.log('🔧 Creating all database tables...\n')
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  try {
    // Core collections (with text IDs for relationships)
    await pool.query(`CREATE TABLE IF NOT EXISTS "users" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "email" VARCHAR UNIQUE, "reset_password_token" VARCHAR, "reset_password_expiration" TIMESTAMP(3), "salt" VARCHAR, "hash" VARCHAR, "login_attempts" NUMERIC DEFAULT 0, "lock_until" TIMESTAMP(3))`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "media" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "alt" VARCHAR, "caption" TEXT, "file_name" VARCHAR, "mime_type" VARCHAR, "filesize" NUMERIC, "width" NUMERIC, "height" NUMERIC, "focal_x" NUMERIC, "focal_y" NUMERIC, "url" VARCHAR, "thumbnail_url" VARCHAR, "file_path" VARCHAR)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "pages" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "posts" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "categories" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "services" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "projects" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    
    // Globals
    await pool.query(`CREATE TABLE IF NOT EXISTS "header" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "footer" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "site_settings" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "services_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "contact_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    // Translations global WITH join table (TEXT IDs!)
    await pool.query(`CREATE TABLE IF NOT EXISTS "translations" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "translations_translations" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "translations"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY, "locale" VARCHAR, "strings" JSONB)`)
    
    // Payload system tables
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_migrations" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(255), "batch" INTEGER, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_preferences" ("id" VARCHAR PRIMARY KEY, "key" VARCHAR(255), "value" JSONB, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_locked_documents" ("id" VARCHAR PRIMARY KEY, "global_slug" VARCHAR, "document_id" VARCHAR, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_jobs" ("id" VARCHAR PRIMARY KEY, "input" JSONB, "queue" VARCHAR, "wait_until" TIMESTAMP(3), "retries_left" INTEGER, "error" JSONB, "executing" VARCHAR, "completed_at" TIMESTAMP(3), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    console.log('✅ All database tables created!')
    await pool.end()
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Failed:', error.message)
    await pool.end()
    process.exit(1)
  }
}

createTables()
