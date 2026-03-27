import { Pool } from 'pg'

async function createTables() {
  console.log('🔧 Creating all database tables...\n')
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  try {
    // DROP all tables first (in correct order due to foreign keys)
    console.log('Dropping existing tables...')
    await pool.query(`DROP TABLE IF EXISTS "translations_translations" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "payload_jobs" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "payload_locked_documents" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "payload_preferences" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "payload_migrations" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "contact_page" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "services_page" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "about_page" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "home_page" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "site_settings" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "footer" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "header" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "projects" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "services" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "categories" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "posts" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "pages" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "media" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "users" CASCADE`)
    await pool.query(`DROP TABLE IF EXISTS "translations" CASCADE`)
    console.log('✅ Tables dropped\n')
    
    // Now create with correct VARCHAR IDs
    console.log('Creating tables with VARCHAR IDs...')
    
    await pool.query(`CREATE TABLE "users" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "email" VARCHAR UNIQUE, "reset_password_token" VARCHAR, "reset_password_expiration" TIMESTAMP(3), "salt" VARCHAR, "hash" VARCHAR, "login_attempts" NUMERIC DEFAULT 0, "lock_until" TIMESTAMP(3))`)
    
    await pool.query(`CREATE TABLE "media" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "alt" VARCHAR, "caption" TEXT, "file_name" VARCHAR, "mime_type" VARCHAR, "filesize" NUMERIC, "width" NUMERIC, "height" NUMERIC, "focal_x" NUMERIC, "focal_y" NUMERIC, "url" VARCHAR, "thumbnail_url" VARCHAR, "file_path" VARCHAR)`)
    
    await pool.query(`CREATE TABLE "pages" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    
    await pool.query(`CREATE TABLE "posts" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    
    await pool.query(`CREATE TABLE "categories" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR)`)
    
    await pool.query(`CREATE TABLE "services" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    
    await pool.query(`CREATE TABLE "projects" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    
    await pool.query(`CREATE TABLE "header" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "footer" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "site_settings" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "home_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "about_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "services_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "contact_page" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    await pool.query(`CREATE TABLE "translations" ("id" VARCHAR PRIMARY KEY, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "translations_translations" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "translations"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY, "locale" VARCHAR, "strings" JSONB)`)
    
    await pool.query(`CREATE TABLE "payload_migrations" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(255), "batch" INTEGER, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "payload_preferences" ("id" VARCHAR PRIMARY KEY, "key" VARCHAR(255), "value" JSONB, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "payload_locked_documents" ("id" VARCHAR PRIMARY KEY, "global_slug" VARCHAR, "document_id" VARCHAR, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "payload_jobs" ("id" VARCHAR PRIMARY KEY, "input" JSONB, "queue" VARCHAR, "wait_until" TIMESTAMP(3), "retries_left" INTEGER, "error" JSONB, "executing" VARCHAR, "completed_at" TIMESTAMP(3), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    console.log('✅ All database tables created with correct schema!')
    await pool.end()
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Failed:', error.message)
    await pool.end()
    process.exit(1)
  }
}

createTables()
