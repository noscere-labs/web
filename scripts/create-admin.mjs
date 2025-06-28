import { getPayload } from 'payload'
import config from '../payload.config.js'

async function createAdmin() {
  try {
    const payload = await getPayload({ config })
    
    // Check if any users exist
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })
    
    if (users.docs.length === 0) {
      // Create first admin user
      const adminUser = await payload.create({
        collection: 'users',
        data: {
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@noscere.com',
          password: 'password123',
          role: 'admin',
        },
      })
      
      console.log('✅ Admin user created successfully:')
      console.log(`Email: ${adminUser.email}`)
      console.log('Password: password123')
      console.log('\nYou can now access the admin panel at: http://localhost:3000/admin')
    } else {
      console.log('ℹ️  Admin user already exists')
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    process.exit(0)
  }
}

createAdmin()