const { Router } = require("express");
const transactionRecurrenciesRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const CategoryBelongsUserMiddleware = require("../middleware/CategoryBelongsUserMiddleware");

const ListUserTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/listUserTransactionRecurrencies/ListUserTransactionRecurrenciesController");
const listUserTransactionRecurrenciesController =
    new ListUserTransactionRecurrenciesController();

transactionRecurrenciesRoutes.get(
    "/",
    [
        AuthenticationMiddleware.verifyToken,
        CategoryBelongsUserMiddleware.verifyCategoryBelongsUser,
    ],
    listUserTransactionRecurrenciesController.list
);

module.exports = transactionRecurrenciesRoutes;
