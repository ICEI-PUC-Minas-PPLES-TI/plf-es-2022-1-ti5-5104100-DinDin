const { Router } = require("express");
const transactionRecurrenciesRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const ListUserTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/listUserTransactionRecurrencies/ListUserTransactionRecurrenciesController");
const listUserTransactionRecurrenciesController =
    new ListUserTransactionRecurrenciesController();

transactionRecurrenciesRoutes.get(
    "/",
    [AuthenticationMiddleware.verifyToken],
    listUserTransactionRecurrenciesController.list
);

module.exports = transactionRecurrenciesRoutes;
