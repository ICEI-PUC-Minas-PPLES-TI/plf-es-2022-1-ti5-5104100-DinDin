const { Router } = require("express");
const router = Router();

const jwtAuthorization = require("./jwtAuthorization");

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const walletRoutes = require("./walletRoutes");

// User
router.use('/user', userRoutes)
router.use('/goal', goalRoutes)
router.use('/wallet', walletRoutes)

module.exports = router;
