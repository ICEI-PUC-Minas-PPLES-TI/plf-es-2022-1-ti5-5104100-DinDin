const { Router } = require("express");
const transactionWalletRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const UserAccessWalletMiddleware = require("../middleware/UserAccessWalletMiddleware");
const CategoryBelongsWalletMiddleware = require("../middleware/CategoryBelongsWalletMiddleware");

const CreateTransactionController = require("../usecases/transaction/createTransaction/CreateTransactionController");
const UpdateTransactionController = require("../usecases/transaction/updateTransaction/UpdateTransactionController");
const CreateTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/createTransactionRecurrencies/CreateTransactionRecurrenciesController");
const UpdateTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/updateTransactionRecurrencies/UpdateTransactionRecurrenciesController");
const FindTransactionController = require("../usecases/transaction/findTransaction/FindTransactionController");
const FindTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/findTransactionRecurrencies/FindTransactionRecurrenciesController");
const DeleteTransactionController = require("../usecases/transaction/deleteTransaction/DeleteTransactionController");
const DeleteTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/deleteTransactionRecurrencies/DeleteTransactionRecurrenciesController");
const ListWalletTransactionController = require("../usecases/transaction/listWalletTransaction/ListWalletTransactionController");
const ListWalletTransactionRecurrenciesController = require("../usecases/transactionRecurrencies/listWalletTransactionRecurrencies/ListWalletTransactionRecurrenciesController");

const createTransactionController = new CreateTransactionController();
const updateTransactionController = new UpdateTransactionController();
const createTransactionRecurrenciesController =
    new CreateTransactionRecurrenciesController();
const updateTransactionRecurrenciesController =
    new UpdateTransactionRecurrenciesController();
const findTransactionController = new FindTransactionController();
const findTransactionRecurrenciesController =
    new FindTransactionRecurrenciesController();
const deleteTransactionController = new DeleteTransactionController();
const deleteTransactionRecurrenciesController =
    new DeleteTransactionRecurrenciesController();
const listWalletTransactionController = new ListWalletTransactionController();
const listWalletTransactionRecurrenciesController =
    new ListWalletTransactionRecurrenciesController();

transactionWalletRoutes.post(
    "/:id/transaction",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    createTransactionController.create
);

transactionWalletRoutes.post(
    "/:id/transactionrecurrencies",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    createTransactionRecurrenciesController.create
);

transactionWalletRoutes.put(
    "/:id/transaction/:tid",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    updateTransactionController.update
);

transactionWalletRoutes.put(
    "/:id/transactionrecurrencies/:trid",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    updateTransactionRecurrenciesController.update
);

transactionWalletRoutes.get(
    "/:id/transaction/:tid",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    findTransactionController.find
);

transactionWalletRoutes.get(
    "/:id/transactionrecurrencies/:tid",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    findTransactionRecurrenciesController.find
);

transactionWalletRoutes.delete(
    "/:id/transaction/:tid",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteTransactionController.delete
);

transactionWalletRoutes.delete(
    "/:id/transactionrecurrencies/:tid",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteTransactionRecurrenciesController.delete
);

transactionWalletRoutes.get(
    "/:id/transaction",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    listWalletTransactionController.list
);

transactionWalletRoutes.get(
    "/:id/transactionrecurrencies",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    listWalletTransactionRecurrenciesController.list
);

module.exports = transactionWalletRoutes;
