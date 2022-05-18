const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const walletRoutes = require("./walletRoutes");
const walletCategoryRoutes = require("./walletCategoryRoutes");
const transactionRoutes = require("./transactionRoutes");
const transactionRecurrenciesRoutes = require("./transactionRecurrenciesRoutes");
const transactionReportRoutes = require("./transactionReportRoutes");

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);
router.use(walletCategoryRoutes);
router.use("/wallet", walletRoutes);
router.use("/transaction", transactionRoutes);
router.use("/transactionrecurrencies", transactionRecurrenciesRoutes);
router.use("/report", transactionReportRoutes);
router.use("/transactionrecurrencies", transactionRecurrenciesRoutes);

module.exports = router;
