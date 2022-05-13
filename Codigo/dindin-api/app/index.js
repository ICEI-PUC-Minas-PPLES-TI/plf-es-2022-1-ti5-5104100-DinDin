require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const logger = require("morgan");

const routes = require("./routes/index"); // Require API routes

// Create express instance
const app = express();

// Define cors origin
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.APP_DEBUG) app.use(logger("dev"));

// Import API Routes
app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DinDin application API." });
});

// é necessário desabilitar a linha eslint abaixo pq ele reclama do next não ser usado, mas ao tirar ele, o callback para de ser um middleware de erro. (err, req, res, next) -> (req, res, next)
// eslint-disable-next-line no-unused-vars
app.use(function (error, req, response, next) {
    console.log(error);
    if (process.env.APP_DEBUG) {
        return response.status(error.statusCode ?? 500).json({
            status: "Error",
            message: error.message,
            error: error,
        });
    } else {
        return response.status(error.statusCode ?? 500).json({
            status: "Error",
            message: error.message,
        });
    }
});

// Export express app
module.exports = app;
