import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const { default: config } = await import(path.join(__dirname, '..', 'src', 'payload.config.ts'))

async function createAdminUser() {
  console.log('🔑 Creating new admin user...\n')

  const payload = await getPayload({ config })

  try {
    // Check if admin user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@titanbreakers.nl',
        },
      },
    })

    if (existingUsers.docs.length > 0) {
      console.log('⚠️  Admin user already exists!')
      console.log('   Email: admin@titanbreakers.nl')
      console.log('\n📝 To reset password, run: pnpm reset-password')
      process.exit(0)
    }

    // Create new admin user
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@titanbreakers.nl',
        password: 'TitanBreakers2024!',
        roles: ['admin'],
        name: 'Admin User',
      },
    })

    console.log('✅ Admin user created successfully!\n')
    console.log('📧 Email: admin@titanbreakers.nl')
    console.log('🔒 Password: TitanBreakers2024!')
    console.log('\n⚠️  IMPORTANT: Change this password after first login!')
    console.log('\n🔗 Login at: http://localhost:3000/admin')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
