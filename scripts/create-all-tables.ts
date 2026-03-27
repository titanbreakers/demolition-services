import { Pool } from 'pg'

async function createTables() {
  console.log('🔧 Creating ALL database tables including join tables...\n')
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  try {
    // Drop existing tables first
    console.log('Dropping existing tables...')
    const tables = [
      'users_sessions', 'users_roles',
      'pages_content', 'pages_content_locales',
      'posts_content', 'posts_content_locales', 'posts_categories',
      'media_resized_images',
      'services_content', 'services_content_locales', 'services_categories',
      'projects_content', 'projects_content_locales', 'projects_categories',
      'header_navItems', 'header_navItems_locales', 'header__rels',
      'footer_navItems', 'footer_navItems_locales', 'footer__rels',
      'site_settings_certifications',
      'home_page_hero_ctaButtons', 'home_page_hero_ctaButtons_locales',
      'home_page_hero_stats', 'home_page_hero_stats_locales',
      'home_page_hero_features', 'home_page_hero_features_locales',
      'home_page_aboutPreview_highlights',
      'home_page_locales',
      'about_page_story_paragraphs', 'about_page_story_paragraphs_locales',
      'about_page_stats', 'about_page_stats_locales',
      'about_page_values', 'about_page_values_locales',
      'about_page_timeline', 'about_page_timeline_locales',
      'about_page_locales',
      'services_page_serviceDetails', 'services_page_serviceDetails_locales',
      'services_page_serviceDetails_features', 'services_page_serviceDetails_features_locales',
      'services_page_locales',
      'contact_page_formSettings_subjects', 'contact_page_formSettings_subjects_locales',
      'contact_page_locales',
      'translations_translations',
      'payload_migrations', 'payload_preferences', 'payload_locked_documents', 'payload_jobs',
    ]
    
    for (const table of tables) {
      try {
        await pool.query(`DROP TABLE IF EXISTS "${table}" CASCADE`)
      } catch (e: any) { /* ignore */ }
    }
    
    // Now create base tables
    console.log('Creating base tables...')
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "users" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "email" VARCHAR UNIQUE, "reset_password_token" VARCHAR, "reset_password_expiration" TIMESTAMP(3), "salt" VARCHAR, "hash" VARCHAR, "login_attempts" NUMERIC DEFAULT 0, "lock_until" TIMESTAMP(3), "name" VARCHAR)`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "users_sessions" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "users"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "created_at" TIMESTAMP(3), "expires_at" TIMESTAMP(3))`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "media" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "alt" VARCHAR, "caption" TEXT, "file_name" VARCHAR, "mime_type" VARCHAR, "filesize" NUMERIC, "width" NUMERIC, "height" NUMERIC, "focal_x" NUMERIC, "focal_y" NUMERIC, "url" VARCHAR, "thumbnail_url" VARCHAR, "file_path" VARCHAR)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "pages" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "posts" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE, "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "categories" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "services" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "projects" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE)`)
    
    // Globals
    await pool.query(`CREATE TABLE IF NOT EXISTS "header" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "footer" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "site_settings" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "services_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "contact_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "translations" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    // Join tables for about-page (the one failing)
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_story_paragraphs" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_story_paragraphs_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_story_paragraphs"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_stats" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_stats_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_stats"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, "number" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_values" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_values_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_values"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, "icon" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_timeline" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_timeline_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_timeline"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, "year" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "about_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, "story_title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    // Other critical join tables
    await pool.query(`CREATE TABLE IF NOT EXISTS "translations_translations" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "translations"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "locale" VARCHAR, "strings" JSONB)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_subtitle" JSONB, "hero_description" JSONB, "about_preview_title" JSONB, "about_preview_description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_hero_ctaButtons" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_hero_ctaButtons_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_ctaButtons"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_hero_stats" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_hero_stats_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_stats"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, "number" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_hero_features" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_hero_features_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_features"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, "icon" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "home_page_aboutPreview_highlights" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "text" VARCHAR)`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "services_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "services_page_serviceDetails" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "services_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "services_page_serviceDetails_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page_serviceDetails"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "services_page_serviceDetails_features" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "services_page_serviceDetails"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "services_page_serviceDetails_features_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page_serviceDetails_features"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "feature" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS "contact_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "contact_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, "form_settings_title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "contact_page_formSettings_subjects" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "contact_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "contact_page_formSettings_subjects_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "contact_page_formSettings_subjects"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, "value" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`)
    
    // Payload system tables
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_migrations" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(255), "batch" INTEGER, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_preferences" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "key" VARCHAR(255), "value" JSONB, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_locked_documents" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "global_slug" VARCHAR, "document_id" VARCHAR, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    await pool.query(`CREATE TABLE IF NOT EXISTS "payload_jobs" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "input" JSONB, "queue" VARCHAR, "wait_until" TIMESTAMP(3), "retries_left" INTEGER, "error" JSONB, "executing" VARCHAR, "completed_at" TIMESTAMP(3), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`)
    
    // Add missing columns
    await pool.query(`ALTER TABLE "about_page_stats" ADD COLUMN IF NOT EXISTS "number" VARCHAR`)
    await pool.query(`ALTER TABLE "about_page_stats_locales" ADD COLUMN IF NOT EXISTS "number" VARCHAR`)
    await pool.query(`ALTER TABLE "about_page_timeline" ADD COLUMN IF NOT EXISTS "year" VARCHAR`)
    await pool.query(`ALTER TABLE "home_page_hero_stats" ADD COLUMN IF NOT EXISTS "number" VARCHAR`)
    await pool.query(`ALTER TABLE "home_page_hero_stats_locales" ADD COLUMN IF NOT EXISTS "number" VARCHAR`)
    await pool.query(`ALTER TABLE "contact_page_formSettings_subjects" ADD COLUMN IF NOT EXISTS "value" VARCHAR`)
    await pool.query(`ALTER TABLE "contact_page_formSettings_subjects_locales" ADD COLUMN IF NOT EXISTS "value" VARCHAR`)

    console.log('✅ All database tables created!')
    await pool.end()
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Failed:', error.message)
    await pool.end()
    process.exit(1)
  }
}

