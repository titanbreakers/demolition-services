import { Pool } from 'pg'

async function createTables() {
  console.log('🔧 Creating ALL database tables including join tables...\n')

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    // DROP all tables first to ensure clean slate
    console.log('Dropping existing tables...')

    // First drop all tables with CASCADE in dependency order (children first)
    const dropOrder = [
      // Locale tables first (most dependent)
      'contact_page_form_settings_subjects_locales',
      'services_page_service_details_features_locales',
      'services_page_service_details_locales',
      'home_page_hero_features_locales',
      'home_page_hero_stats_locales',
      'home_page_hero_cta_buttons_locales',
      'about_page_locales',
      'about_page_timeline_locales',
      'about_page_values_locales',
      'about_page_stats_locales',
      'about_page_story_paragraphs_locales',
      'home_page_locales',
      'pages_locales',
      'posts_locales',
      'categories_locales',
      'services_locales',
      'projects_locales',
      'contact_page_locales',
      'services_page_locales',
      // Array/child tables
      'contact_page_form_settings_subjects',
      'services_page_service_details_features',
      'services_page_service_details',
      'home_page_hero_features',
      'home_page_hero_stats',
      'home_page_hero_cta_buttons',
      'home_page_about_preview_highlights',
      'about_page_timeline',
      'about_page_values',
      'about_page_stats',
      'about_page_story_paragraphs',
      'translations_translations',
      'users_sessions',
      // Main tables
      'contact_page',
      'services_page',
      'home_page',
      'about_page',
      'translations',
      'projects',
      'services',
      'categories',
      'posts',
      'pages',
      'media_folders',
      'media_folders',
      'media',
      'users',
      'header',
      'footer',
      'site_settings',
      'payload_jobs',
      'payload_locked_documents',
      'payload_preferences',
      'payload_migrations',
    ]

    for (const table of dropOrder) {
      try {
        await pool.query(`DROP TABLE IF EXISTS "${table}" CASCADE`)
        console.log(`  Dropped: ${table}`)
      } catch (e: any) {
        console.log(`  Skip (not found): ${table}`)
      }
    }

    // Second pass - catch any remaining tables
    console.log('\nSecond pass cleanup...')
    for (const table of dropOrder) {
      try {
        await pool.query(`DROP TABLE IF EXISTS "${table}" CASCADE`)
      } catch (e: any) {
        /* ignore */
      }
    }

    console.log('✅ Tables dropped\n')

    // Now create all tables fresh
    console.log('Creating tables...')

    // Users collection
    await pool.query(
      `CREATE TABLE "users" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "email" VARCHAR UNIQUE, "reset_password_token" VARCHAR, "reset_password_expiration" TIMESTAMP(3), "salt" VARCHAR, "hash" VARCHAR, "login_attempts" NUMERIC DEFAULT 0, "lock_until" TIMESTAMP(3), "name" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "users_sessions" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "users"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "created_at" TIMESTAMP(3), "expires_at" TIMESTAMP(3))`,
    )

    // Media collection with folders support
    await pool.query(
      `CREATE TABLE "media" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "alt" VARCHAR, "caption" TEXT, "filename" VARCHAR, "mime_type" VARCHAR, "filesize" NUMERIC, "width" NUMERIC, "height" NUMERIC, "focal_x" NUMERIC, "focal_y" NUMERIC, "url" VARCHAR, "thumbnail_url" VARCHAR, "file_path" VARCHAR, "folder_id" VARCHAR, "thumbnail_width" NUMERIC, "thumbnail_height" NUMERIC, "square_width" NUMERIC, "square_height" NUMERIC, "small_width" NUMERIC, "small_height" NUMERIC, "medium_width" NUMERIC, "medium_height" NUMERIC, "large_width" NUMERIC, "large_height" NUMERIC, "xlarge_width" NUMERIC, "xlarge_height" NUMERIC, "og_width" NUMERIC, "og_height" NUMERIC)`,
    )
    await pool.query(
      `CREATE TABLE "media_folders" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "name" VARCHAR NOT NULL, "slug" VARCHAR, "parent_id" VARCHAR REFERENCES "media_folders"("id") ON DELETE CASCADE, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )

    // Pages collection with locales
    await pool.query(
      `CREATE TABLE "pages" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR, "published_at" TIMESTAMP(3), "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`,
    )
    await pool.query(
      `CREATE TABLE "pages_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // Posts collection with locales
    await pool.query(
      `CREATE TABLE "posts" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE, "published_at" TIMESTAMP(3), "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`,
    )
    await pool.query(
      `CREATE TABLE "posts_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // Categories collection with locales
    await pool.query(
      `CREATE TABLE "categories" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "categories_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "categories"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // Services collection with locales
    await pool.query(
      `CREATE TABLE "services" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "description" TEXT, "icon" VARCHAR, "featured" BOOLEAN DEFAULT false, "image_id" VARCHAR, "slug" VARCHAR UNIQUE)`,
    )
    await pool.query(
      `CREATE TABLE "services_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // Projects collection with locales
    await pool.query(
      `CREATE TABLE "projects" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "description" TEXT, "image_id" VARCHAR, "category" VARCHAR DEFAULT 'demolition', "completed" TIMESTAMP(3), "featured" BOOLEAN DEFAULT false, "slug" VARCHAR UNIQUE)`,
    )
    await pool.query(
      `CREATE TABLE "projects_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "projects"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // Globals - Header, Footer, SiteSettings (no locales)
    await pool.query(
      `CREATE TABLE "header" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "footer" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "site_settings" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )

    // HomePage global with locales
    await pool.query(
      `CREATE TABLE "home_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "hero_background_image_id" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "home_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_subtitle" JSONB, "hero_description" JSONB, "about_preview_title" JSONB, "about_preview_description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "home_page_hero_cta_buttons" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "style" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "home_page_hero_cta_buttons_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_cta_buttons"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "home_page_hero_stats" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "number" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "home_page_hero_stats_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_stats"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "home_page_hero_features" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "icon" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "home_page_hero_features_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "home_page_hero_features"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "home_page_about_preview_highlights" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "home_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "text" VARCHAR)`,
    )

    // AboutPage global with locales
    await pool.query(
      `CREATE TABLE "about_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "hero_background_image_id" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "about_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, "story_title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "about_page_story_paragraphs" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`,
    )
    await pool.query(
      `CREATE TABLE "about_page_story_paragraphs_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_story_paragraphs"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "about_page_stats" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "number" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "about_page_stats_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_stats"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "about_page_values" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "icon" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "about_page_values_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_values"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "about_page_timeline" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "about_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "year" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "about_page_timeline_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "about_page_timeline"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // ServicesPage global with locales
    await pool.query(
      `CREATE TABLE "services_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "services_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "services_page_service_details" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "services_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`,
    )
    await pool.query(
      `CREATE TABLE "services_page_service_details_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page_service_details"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, "description" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "services_page_service_details_features" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "services_page_service_details"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`,
    )
    await pool.query(
      `CREATE TABLE "services_page_service_details_features_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "services_page_service_details_features"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "feature" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // ContactPage global with locales
    await pool.query(
      `CREATE TABLE "contact_page" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "contact_page_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "contact_page"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "hero_title" JSONB, "hero_description" JSONB, "form_settings_title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "contact_page_form_settings_subjects" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "contact_page"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "value" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "contact_page_form_settings_subjects_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "contact_page_form_settings_subjects"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // Translations global
    await pool.query(
      `CREATE TABLE "translations" ("id" VARCHAR PRIMARY KEY DEFAULT '1', "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "translations_translations" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "translations"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "locale" VARCHAR, "strings" JSONB)`,
    )

    // Payload system tables
    await pool.query(
      `CREATE TABLE "payload_migrations" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(255), "batch" INTEGER, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "payload_preferences" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "key" VARCHAR(255), "value" JSONB, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "payload_locked_documents" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "global_slug" VARCHAR, "document_id" VARCHAR, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )
    await pool.query(
      `CREATE TABLE "payload_jobs" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "input" JSONB, "queue" VARCHAR, "wait_until" TIMESTAMP(3), "retries_left" INTEGER, "error" JSONB, "executing" VARCHAR, "completed_at" TIMESTAMP(3), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )

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
