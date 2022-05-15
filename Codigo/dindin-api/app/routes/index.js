const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const walletRoutes = require("./walletRoutes");
const transactionRoutes = require("./transactionRoutes");
const transactionRecurrenciesRoutes = require("./transactionRecurrenciesRoutes");
const walletCategoryRoutes = require("./walletCategoryRoutes");

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);
router.use(walletCategoryRoutes);
router.use("/wallet", walletRoutes);
router.use("/transaction", transactionRoutes);
router.use("/transactionrecurrencies", transactionRecurrenciesRoutes);

module.exports = router;
