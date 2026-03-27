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
      // Pages nested tables (most dependent first)
      'pages_layout_form_blocks_locales',
      'pages_layout_form_blocks',
      'pages_layout_archive_blocks_locales',
      'pages_layout_archive_blocks',
      'pages_layout_media_blocks',
      'pages_layout_columns_locales',
      'pages_layout_columns',
      'pages_layout_locales',
      'pages_layout',
      'pages_hero_links_locales',
      'pages_hero_links',
      'pages_hero_locales',
      'pages_hero',
      'pages_locales',
      // Posts nested tables
      'posts_populated_authors',
      'posts_authors',
      'posts_categories',
      'posts_related_posts',
      'posts_content_locales',
      'posts_content',
      'posts_locales',
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

    // Media collection with folders support and image sizes
    await pool.query(
      `CREATE TABLE "media" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "alt" VARCHAR, "caption" TEXT, "filename" VARCHAR, "mime_type" VARCHAR, "filesize" NUMERIC, "width" NUMERIC, "height" NUMERIC, "focal_x" NUMERIC, "focal_y" NUMERIC, "url" VARCHAR, "thumbnail_u_r_l" VARCHAR, "file_path" VARCHAR, "folder_id" VARCHAR, "sizes_thumbnail_url" VARCHAR, "sizes_thumbnail_width" NUMERIC, "sizes_thumbnail_height" NUMERIC, "sizes_thumbnail_mime_type" VARCHAR, "sizes_thumbnail_filesize" NUMERIC, "sizes_thumbnail_filename" VARCHAR, "sizes_square_url" VARCHAR, "sizes_square_width" NUMERIC, "sizes_square_height" NUMERIC, "sizes_square_mime_type" VARCHAR, "sizes_square_filesize" NUMERIC, "sizes_square_filename" VARCHAR, "sizes_small_url" VARCHAR, "sizes_small_width" NUMERIC, "sizes_small_height" NUMERIC, "sizes_small_mime_type" VARCHAR, "sizes_small_filesize" NUMERIC, "sizes_small_filename" VARCHAR, "sizes_medium_url" VARCHAR, "sizes_medium_width" NUMERIC, "sizes_medium_height" NUMERIC, "sizes_medium_mime_type" VARCHAR, "sizes_medium_filesize" NUMERIC, "sizes_medium_filename" VARCHAR, "sizes_large_url" VARCHAR, "sizes_large_width" NUMERIC, "sizes_large_height" NUMERIC, "sizes_large_mime_type" VARCHAR, "sizes_large_filesize" NUMERIC, "sizes_large_filename" VARCHAR, "sizes_xlarge_url" VARCHAR, "sizes_xlarge_width" NUMERIC, "sizes_xlarge_height" NUMERIC, "sizes_xlarge_mime_type" VARCHAR, "sizes_xlarge_filesize" NUMERIC, "sizes_xlarge_filename" VARCHAR, "sizes_og_url" VARCHAR, "sizes_og_width" NUMERIC, "sizes_og_height" NUMERIC, "sizes_og_mime_type" VARCHAR, "sizes_og_filesize" NUMERIC, "sizes_og_filename" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "media_folders" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "name" VARCHAR NOT NULL, "slug" VARCHAR, "parent_id" VARCHAR REFERENCES "media_folders"("id") ON DELETE CASCADE, "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW())`,
    )

    // Pages collection with locales and blocks
    await pool.query(
      `CREATE TABLE "pages" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR, "published_at" TIMESTAMP(3), "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft')`,
    )
    await pool.query(
      `CREATE TABLE "pages_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    // Pages hero group (localized)
    await pool.query(
      `CREATE TABLE "pages_hero" ("_parent_id" VARCHAR PRIMARY KEY REFERENCES "pages"("id") ON DELETE CASCADE, "type" VARCHAR DEFAULT 'lowImpact', "media_id" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "pages_hero_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages_hero"("_parent_id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "rich_text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    await pool.query(
      `CREATE TABLE "pages_hero_links" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "pages_hero"("_parent_id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid())`,
    )
    await pool.query(
      `CREATE TABLE "pages_hero_links_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages_hero_links"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "label" JSONB, "url" JSONB, "appearance" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    // Pages layout blocks array (localized)
    await pool.query(
      `CREATE TABLE "pages_layout" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "pages"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "block_type" VARCHAR, "style" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "pages_layout_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "rich_text" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    // Content block columns
    await pool.query(
      `CREATE TABLE "pages_layout_columns" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "size" VARCHAR DEFAULT 'oneThird', "enable_link" BOOLEAN DEFAULT false)`,
    )
    await pool.query(
      `CREATE TABLE "pages_layout_columns_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout_columns"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "rich_text" JSONB, "url" JSONB, "label" JSONB, "appearance" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    // Media block
    await pool.query(
      `CREATE TABLE "pages_layout_media_blocks" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "media_id" VARCHAR, "position" VARCHAR DEFAULT 'default')`,
    )
    // Archive block
    await pool.query(
      `CREATE TABLE "pages_layout_archive_blocks" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "intro_content" VARCHAR, "populate_by" VARCHAR DEFAULT 'collection', "relation_to" VARCHAR, "limit" NUMERIC DEFAULT 10)`,
    )
    await pool.query(
      `CREATE TABLE "pages_layout_archive_blocks_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout_archive_blocks"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "intro_content" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    // Form block
    await pool.query(
      `CREATE TABLE "pages_layout_form_blocks" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "form_id" VARCHAR, "enable_intro" BOOLEAN DEFAULT false, "intro_content" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "pages_layout_form_blocks_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "pages_layout_form_blocks"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "intro_content" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )

    // Posts collection with locales and content blocks
    await pool.query(
      `CREATE TABLE "posts" ("id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP(3) DEFAULT NOW(), "created_at" TIMESTAMP(3) DEFAULT NOW(), "title" VARCHAR, "slug" VARCHAR UNIQUE, "published_at" TIMESTAMP(3), "meta_title" VARCHAR, "meta_description" TEXT, "_status" VARCHAR DEFAULT 'draft', "hero_image_id" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "posts_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "title" JSONB, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    // Posts content blocks array (localized richText with blocks)
    await pool.query(
      `CREATE TABLE "posts_content" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "block_type" VARCHAR, "style" VARCHAR, "language" VARCHAR DEFAULT 'typescript')`,
    )
    await pool.query(
      `CREATE TABLE "posts_content_locales" ("_parent_id" VARCHAR NOT NULL REFERENCES "posts_content"("id") ON DELETE CASCADE, "_locale" VARCHAR NOT NULL, "content" JSONB, "code" VARCHAR, PRIMARY KEY ("_parent_id", "_locale"))`,
    )
    // Posts related posts and categories
    await pool.query(
      `CREATE TABLE "posts_related_posts" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "post_id" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "posts_categories" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "category_id" VARCHAR)`,
    )
    // Posts authors
    await pool.query(
      `CREATE TABLE "posts_authors" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "user_id" VARCHAR)`,
    )
    await pool.query(
      `CREATE TABLE "posts_populated_authors" ("_order" INTEGER, "_parent_id" VARCHAR NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE, "id" VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(), "id_ref" VARCHAR, "name" VARCHAR)`,
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
