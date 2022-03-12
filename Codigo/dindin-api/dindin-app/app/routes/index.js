const { Router } = require("express");
const router = Router();

const userRoutes = require("./createAccount/userRoutes");

// User
router.use('/user', userRoutes)

module.exports = router;
