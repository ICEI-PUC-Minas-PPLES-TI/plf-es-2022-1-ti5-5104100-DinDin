console.log("init test global-setup")
const { connect, createDatabase } = require('../database/index');
const migrate = require('../database/migrations/prog');
const seeder = require('../database/seeders/prog');
// Create the database

// Seed the database with schema and data
async function seedTestDatabase() {
  // await connect()
  try {
    await migrate()
    await seeder()
  } catch (error) {
    throw new Error(error)
  } finally {
    //await close()
  }
}

module.exports = async () => {
  try {
    await createDatabase()
    await seedTestDatabase()
    console.log('Test database created successfully');
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
