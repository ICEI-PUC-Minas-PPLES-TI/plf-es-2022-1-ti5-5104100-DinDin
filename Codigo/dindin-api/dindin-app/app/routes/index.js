const { Router } = require("express");
const router = Router();

const jwtAuthorization = require("./jwtAuthorization");

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const categoryRoytes = require("./categoryRoutes");

// User
router.use('/user', userRoutes)
router.use('/category', categoryRoytes)

module.exports = router;
