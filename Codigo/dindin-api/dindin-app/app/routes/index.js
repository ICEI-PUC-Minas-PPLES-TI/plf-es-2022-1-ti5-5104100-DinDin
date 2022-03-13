const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");

// User
router.use('/user', userRoutes)

module.exports = router;
