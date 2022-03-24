require("dotenv").config();
const sequelizeDatabase = require("./app/database/index");

// Create express instance
const app = require("./app");

async function databaseInitialization() {
  await sequelizeDatabase.createDatabase();
  await sequelizeDatabase.connect();
}

databaseInitialization();

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.NODE_PUBLIC_PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
    console.log(`---> http://${process.env.NODE_APP_HOST}:${port}`)
  });
}

module.exports = app;
