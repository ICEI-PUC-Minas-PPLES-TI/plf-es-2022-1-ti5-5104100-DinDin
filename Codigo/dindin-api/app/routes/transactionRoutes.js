const { Router } = require("express");
const transactionRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const ListUserTransactionController = require("../usecases/transaction/listUserTransaction/ListUserTransactionController");
const listUserTransactionController = new ListUserTransactionController();

transactionRoutes.get(
    "/",
    [AuthenticationMiddleware.verifyToken],
    listUserTransactionController.list
);

module.exports = transactionRoutes;
