const { Router } = require("express");
const transactionRecurrenciesRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const CategoryBelongsWalletMiddleware = require("../middleware/CategoryBelongsWalletMiddleware");

const ListUserTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/listUserTransactionRecurrencies/ListUserTransactionRecurrenciesController");
const listUserTransactionRecurrenciesController =
    new ListUserTransactionRecurrenciesController();

transactionRecurrenciesRoutes.get(
    "/",
    [
        AuthenticationMiddleware.verifyToken,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    listUserTransactionRecurrenciesController.list
);

module.exports = transactionRecurrenciesRoutes;
