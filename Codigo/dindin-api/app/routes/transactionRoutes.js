const { Router } = require("express");
const transactionRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const CategoryBelongsUserMiddleware = require("../middleware/CategoryBelongsUserMiddleware");

const ListUserTransactionController = require("../usecases/transaction/listUserTransaction/ListUserTransactionController");
const listUserTransactionController = new ListUserTransactionController();

transactionRoutes.get(
    "/",
    [
        AuthenticationMiddleware.verifyToken,
        CategoryBelongsUserMiddleware.verifyCategoryBelongsUser,
    ],
    listUserTransactionController.list
);

module.exports = transactionRoutes;
