const { Router } = require("express");
const router = Router();

// ! const jwtAuthorization = require("./jwtAuthorization");

const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const walletRoutes = require("./walletRoutes");
const walletCategoryRoutes = require("./walletCategoryRoutes");

router.use("/user", userRoutes);
router.use("/goal", goalRoutes);
router.use("/wallet", walletRoutes);
router.use("/wallet/:id/category", walletCategoryRoutes);

module.exports = router;
