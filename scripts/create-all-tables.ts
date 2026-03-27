import { Pool } from 'pg'

async function createTables() {
  console.log('🔧 Creating ALL database tables including join tables...\n')
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  try {
    // DROP all tables first to ensure clean slate
    console.log('Dropping existing tables...')
    const tablesToDrop = [
      'contact_page_formSettings_subjects_locales', 'contact_page_formSettings_subjects',
      'contact_page_locales', 'contact_page',
      'services_page_serviceDetails_features_locales', 'services_page_serviceDetails_features',
      'services_page_serviceDetails_locales', 'services_page_serviceDetails',
      'services_page_locales', 'services_page',
      'home_page_aboutPreview_highlights', 'home_page_hero_features_locales', 'home_page_hero_features',
      'home_page_hero_stats_locales', 'home_page_hero_stats',
      'home_page_hero_ctaButtons_locales', 'home_page_hero_ctaButtons',
      'home_page_locales', 'home_page',
      'about_page_locales', 'about_page_timeline_locales', 'about_page_timeline',
      'about_page_values_locales', 'about_page_values',
      'about_page_stats_locales', 'about_page_stats',
      'about_page_story_paragraphs_locales', 'about_page_story_paragraphs', 'about_page',
      'translations_translations', 'translations',
      'projects', 'services', 'categories', 'posts', 'pages', 'media',
      'users_sessions', 'users',
      'payload_jobs', 'payload_locked_documents', 'payload_preferences', 'payload_migrations',
    ]
    
    for (const table of tablesToDrop) {
      try {
        await pool.query(`DROP TABLE IF EXISTS "${table}" CASCADE`)
      } catch (e: any) { /* ignore */ }
    }
    console.log('✅ Tables dropped\n')
    
    // Now create all tables fresh
    console.log('Creating tables...')
    
    await pool.query(`CREATE TABLE "users" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "email" VARCHAR UNIQUE, "reset_password_token" VARCHAR, "reset_password_expiration" TIMESTAMP(3), "salt" VARCHAR, "hash" VARCHAR, "login_attempts" NUMERIC DEFAULT 0, "lock_until" TIMESTAMP(3), "name" VARCHAR)`)
    await pool.query(`CREATE TABLE "users_sessions" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "users"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "created_at" TIMESTAMP(3), "expires_at" TIMESTAMP(3))`)
    
    await pool.query(`CREATE TABLE "media" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "alt" VARCHAR, "caption" TEXT, "file_name" VARCHAR, "mime_type" VARCHAR, "filesize" NUMERIC, "width" NUMERIC, "height" NUMERIC, "focal_x" NUMERIC, "focal_y" NUMERIC, "url" VARCHAR, "thumbnail_url" VARCHAR, "file_path" VARCHAR)`)
    
    await pool.query(`CREATE TABLE "pages" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    await pool.query(`CREATE TABLE "posts" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    await pool.query(`CREATE TABLE "categories" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR)`)
    await pool.query(`CREATE TABLE "services" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    await pool.query(`CREATE TABLE "projects" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    
    // Globals
    await pool.query(`CREATE TABLE "header" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "footer" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "site_settings" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "home_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "about_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "services_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "contact_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "translations" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    // Join tables for about-page WITH number column
    await pool.query(`CREATE TABLE "about_page_story_paragraphs" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE "about_page_story_paragraphs_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_story_paragraphs"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE "about_page_stats" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "number" VARCHAR)`)
    await pool.query(`CREATE TABLE "about_page_stats_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_stats"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE "about_page_values" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE "about_page_values_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_values"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, "icon" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE "about_page_timeline" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "year" VARCHAR)`)
    await pool.query(`CREATE TABLE "about_page_timeline_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_timeline"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE "about_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, "story_title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    // Join tables for translations
    await pool.query(`CREATE TABLE "translations_translations" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "translations"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "locale" VARCHAR, "strings" JSONB)`)
    
    // Join tables for home-page WITH number column
    await pool.query(`CREATE TABLE "home_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_subtitle" JSONB, "hero_description" JSONB, "about_preview_title" JSONB, "about_preview_description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE "home_page_hero_ctaButtons" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE "home_page_hero_ctaButtons_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_ctaButtons"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE "home_page_hero_stats" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "number" VARCHAR)`)
    await pool.query(`CREATE TABLE "home_page_hero_stats_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_stats"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE "home_page_hero_features" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE "home_page_hero_features_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_features"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, "icon" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE "home_page_aboutPreview_highlights" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "text" VARCHAR)`)
    
    // Join tables for services-page
    await pool.query(`CREATE TABLE "services_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE "services_page_serviceDetails" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "services_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE "services_page_serviceDetails_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page_serviceDetails"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE "services_page_serviceDetails_features" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "services_page_serviceDetails"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE "services_page_serviceDetails_features_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page_serviceDetails_features"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "feature" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    // Join tables for contact-page WITH value column
    await pool.query(`CREATE TABLE "contact_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "contact_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, "form_settings_title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE "contact_page_formSettings_subjects" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "contact_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "value" VARCHAR)`)
    await pool.query(`CREATE TABLE "contact_page_formSettings_subjects_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "contact_page_formSettings_subjects"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    // Payload system tables
    await pool.query(`CREATE TABLE "payload_migrations" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(255), "batch" INTEGER, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "payload_preferences" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "key" VARCHAR(255), "value" JSONB, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "payload_locked_documents" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "global_slug" VARCHAR, "document_id" VARCHAR, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE "payload_jobs" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "input" JSONB, "queue" VARCHAR, "wait_until" TIMESTAMP(3), "retries_left" INTEGER, "error" JSONB, "executing" VARCHAR, "completed_at" TIMESTAMP(3), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    console.log('\n✅ All database tables created!')
    await pool.end()
    process.exit(0)
  } catch (error: any) {
    console.error('\n❌ Failed:', error.message)
    await pool.end()
    process.exit(1)
  }
}

createTables()
// Force rebuild 1774650668
// Force rebuild 1774650668
