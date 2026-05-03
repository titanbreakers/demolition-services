import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env') })

// PAYLOAD_DROP_DATABASE=true tells Payload's connect() to drop all tables first.
// NODE_ENV must not be 'production' for pushDevSchema to run (auto-creates tables).
process.env.PAYLOAD_DROP_DATABASE = 'true'
const originalNodeEnv = process.env.NODE_ENV
process.env.NODE_ENV = 'development'

console.log('🔧 Creating database tables via Payload schema push...\n')

const { getPayload } = await import('payload')
const { default: config } = await import(path.join(__dirname, '..', 'src', 'payload.config.ts'))

try {
  const payload = await getPayload({ config })
  console.log('✅ All tables created by Payload schema push')
  await payload.db.destroy()
} catch (error: any) {
  console.error('❌ Failed to create tables:', error.message || error)
  process.exit(1)
} finally {
  process.env.NODE_ENV = originalNodeEnv
  process.env.PAYLOAD_DROP_DATABASE = 'false'
}

process.exit(0)
