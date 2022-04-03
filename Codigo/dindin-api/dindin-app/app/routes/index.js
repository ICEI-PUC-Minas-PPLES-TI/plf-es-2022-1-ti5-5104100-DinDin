const { Router } = require("express");
const router = Router();

const jwtAuthorization = require("./jwtAuthorization");

const userRoutes = require("./userRoutes");
const categoryRoytes = require("./categoryRoutes");

// User
router.use('/user', userRoutes)
router.use('/category', categoryRoytes)

module.exports = router;
