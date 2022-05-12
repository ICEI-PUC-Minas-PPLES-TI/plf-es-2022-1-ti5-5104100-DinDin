const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const walletRoutes = require("./walletRoutes");
const categoryRoutes = require("./categoryRoutes");
const transactionRoutes = require("./transactionRoutes");

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);
router.use("/category", categoryRoutes);
router.use("/wallet", walletRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
