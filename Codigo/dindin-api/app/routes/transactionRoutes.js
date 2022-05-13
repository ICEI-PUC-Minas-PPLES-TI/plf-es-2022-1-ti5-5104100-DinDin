const { Router } = require("express");
const transactionRoutes = Router();

const JwtAuthorization = require("../middleware/JwtMiddleware");

const CategoryBelongsWalletMiddleware = require("../middleware/CategoryBelongsWalletMiddleware");

const ListUserTransactionController = require("../usecases/transaction/listUserTransaction/ListUserTransactionController");
const listUserTransactionController = new ListUserTransactionController();

transactionRoutes.get(
    "/",
    [
        JwtAuthorization.verifyToken,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    listUserTransactionController.list
);

module.exports = transactionRoutes;
