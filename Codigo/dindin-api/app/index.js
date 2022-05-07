require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const logger = require("morgan");

const routes = require("./routes/index"); // Require API routes

// Create express instance
const app = express();

// Define cors origin
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.APP_DEBUG) app.use(logger("dev"));

// Import API Routes
app.use("/api", routes);

// eslint-disable-next-line no-unused-vars
app.use(function (error, request, response, next) {
    console.log(error);
    if (process.env.APP_DEBUG) {
        return response.status(error.statusCode).json({
            status: "Error",
            message: error.message,
            error: error,
        });
    } else {
        return response.status(error.statusCode).json({
            status: "Error",
            message: error.message,
        });
    }
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DinDin application API." });
});

// Export express app
module.exports = app;
