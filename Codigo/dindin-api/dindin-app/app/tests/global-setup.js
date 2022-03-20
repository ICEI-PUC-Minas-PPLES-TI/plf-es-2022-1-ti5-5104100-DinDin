console.log("init global-setup")
const connection = require('../database/index');
const migrate = require('../database/migrations/prog');
const seeder = require('../database/seeders/prog');
// Create the database
async function createTestDatabase() {
  try {
    await connection.createDatabase();
  } catch (error) {
    throw new Error(error)
  }
}

// Seed the database with schema and data
async function seedTestDatabase() {
  connection.connect()
  try {
    await migrate()
    await seeder()
  } catch (error) {
    throw new Error(error)
  } finally {
    await connection.close()
  }
}

module.exports = async () => {
    try {
      await createTestDatabase()
      await seedTestDatabase()
      console.log('Test database created successfully')
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
}