const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");

// User
router.use('/user', userRoutes)
router.use('/goal', goalRoutes)

module.exports = router;
