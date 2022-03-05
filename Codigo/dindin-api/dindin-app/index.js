const express = require("express");
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();

// Create express instance
const app = express();

// Require API routes
// const routes = require("./routes");
const AppError = require("./errors/AppError");
// const db = require("./database");

// Define cors origin
var corsOptions = {
  origin: `${process.env.NODE_APP_HOST}:${process.env.NODE_CORS_PORT}`
};

app.use(cors(corsOptions));
app.use(express.json());

// Import API Routes
// app.use(routes);

// db.connect();

app.use(function(error, request, response, next) {
  
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      error: error.error
    });
  }

  // Any other error type
  if (process.env.APP_DEBUG)
    return response.status(500).json({
      status: "Internal server error",
      message: error.message,
      stack: error.stack,
      error: error
    });
  else
    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${error.message}`,
      error: error
    });

});

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.NODE_DOCKER_PORT || 8181;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}






// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");

// db.sequelize.sync();
// // // drop the table if it already exists
// // db.sequelize.sync({ force: true }).then(() => {
// //   console.log("Drop and re-sync db.");
// // });

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to DinDin application." });
// });

// require("./app/routes/turorial.routes")(app);

// // set port, listen for requests
// const PORT = process.env.NODE_DOCKER_PORT || 8181;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
