const { Router } = require("express");
const router = Router();

const jwtAuthorization = require("./jwtAuthorization");

const userRoutes = require("./userRoutes");

// User
router.use('/user', userRoutes)

module.exports = router;
