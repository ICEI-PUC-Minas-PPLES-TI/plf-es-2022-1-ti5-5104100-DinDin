const express = require("express");
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();

// Create express instance
const app = express();

// Require API routes
// const routes = require("./routes");
const AppError = require("./app/errors/AppError");
const sequelizeDatabase = require("./app/database/index");

// Define cors origin
var corsOptions = {
  origin: `${process.env.NODE_APP_HOST}:${process.env.NODE_CORS_PORT}`
};

app.use(cors(corsOptions));
app.use(express.json());

// Import API Routes
// app.use(routes);

async function databaseInitialization() {
  await sequelizeDatabase.createDatabase();
  await sequelizeDatabase.connect();
}
databaseInitialization();

app.use(function(error, request, response, next) {

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message,
      error: error.error
    });
  }

  // Any other error type
  if (process.env.APP_DEBUG)
    return response.status(500).json({
      status: "Error",
      status: "Internal server error",
      message: error.message,
      stack: error.stack,
      error: error
    });
  else
    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${error.message}`
    });

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
  });
}
