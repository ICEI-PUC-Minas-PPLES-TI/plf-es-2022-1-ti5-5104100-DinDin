const { Router } = require("express");
const transactionRecurrenciesRoutes = Router();

const JwtAuthorization = require("../middleware/JwtAuthorizationMiddleware");

const CategoryBelongsWalletMiddleware = require("../middleware/CategoryBelongsWalletMiddleware");

const ListUserTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/listUserTransactionRecurrencies/ListUserTransactionRecurrenciesController");
const listUserTransactionRecurrenciesController =
    new ListUserTransactionRecurrenciesController();

transactionRecurrenciesRoutes.get(
    "/",
    [
        JwtAuthorization.verifyToken,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    listUserTransactionRecurrenciesController.list
);

module.exports = transactionRecurrenciesRoutes;
