const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const walletRoutes = require("./walletRoutes");
const categoryRoutes = require("./categoryRoutes");

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);
router.use("/category", categoryRoutes);
router.use("/wallet", walletRoutes);

module.exports = router;
