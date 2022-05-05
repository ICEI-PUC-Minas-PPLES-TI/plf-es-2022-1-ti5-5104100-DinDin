const { Router } = require("express");
const transactionRoutes = Router();

const jwtAuthorization = require("../middleware/jwtAuthorizationMiddleware");
const UserAccessWalletMiddleware = require("../middleware/UserAccessWalletMiddleware");
const CategoryBelongsWalletMiddleware = require("../middleware/CategoryBelongsWalletMiddleware");

const CreateTransactionController = require("../usecases/transaction/createTransaction/CreateTransactionController");

const createTransactionController = new CreateTransactionController();

transactionRoutes.post(
    "/:id/transaction",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    createTransactionController.create
);

module.exports = transactionRoutes;
