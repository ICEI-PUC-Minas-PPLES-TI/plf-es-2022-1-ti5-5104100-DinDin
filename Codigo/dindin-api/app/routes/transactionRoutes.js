const { Router } = require("express");
const transactionRoutes = Router();

const JwtAuthorization = require("../middleware/JwtAuthorizationMiddleware");
const UserAccessWalletMiddleware = require("../middleware/UserAccessWalletMiddleware");
const CategoryBelongsWalletMiddleware = require("../middleware/CategoryBelongsWalletMiddleware");

const CreateTransactionController = require("../usecases/transaction/createTransaction/CreateTransactionController");

const createTransactionController = new CreateTransactionController();

transactionRoutes.post(
    "/wallet/:id/transaction",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    createTransactionController.create
);

module.exports = transactionRoutes;
