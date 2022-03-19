const express = require("express");
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();

// Create express instance
const app = express();

// Require API routes
const routes = require("./app/routes/index");
const AppError = require("./app/errors/AppError");
const sequelizeDatabase = require("./app/database/index");

// Define cors origin
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());

// Import API Routes
app.use('/api', routes);

async function databaseInitialization() {
  await sequelizeDatabase.createDatabase();
  await sequelizeDatabase.connect();
}
databaseInitialization();

app.use(function (error, request, response, next) {
  console.log(error)
  if(process.env.APP_DEBUG) {
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message,
      error: error
    });
  } else {
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  }
});

// Export express app
module.exports = app;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DinDin application API." });
});

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.NODE_DOCKER_PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
    console.log(`---> http://${process.env.NODE_APP_HOST}:${port}`)
  });
}
