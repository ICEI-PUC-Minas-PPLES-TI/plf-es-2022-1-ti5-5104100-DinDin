const { Router } = require("express");
const walletRoutes = Router();

const JwtAuthorization = require("../middleware/JwtAuthorizationMiddleware");
const UserAccessWalletMiddleware = require("../middleware/UserAccessWalletMiddleware");

const CategoryBelongsWalletMiddleware = require("../middleware/CategoryBelongsWalletMiddleware");

const CreateWalletController = require("../usecases/wallet/createWallet/CreateWalletController");
const FindWalletController = require("../usecases/wallet/findWallet/FindWalletController");
const ListWalletController = require("../usecases/wallet/listWallet/ListWalletController");
const UpdateWalletController = require("../usecases/wallet/updateWallet/UpdateWalletController");
const DeleteWalletController = require("../usecases/wallet/deleteWallet/DeleteWalletController");
const InviteWalletController = require("../usecases/wallet/inviteWallet/InviteWalletController");
const ListWalletUsersController = require("../usecases/wallet/listWalletUsers/ListWalletUsersController");

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

const createWalletController = new CreateWalletController();
const listWalletController = new ListWalletController();
const updateWalletController = new UpdateWalletController();
const deleteWalletController = new DeleteWalletController();
const findWalletController = new FindWalletController();
const inviteWalletController = new InviteWalletController();
const listWalletUsersController = new ListWalletUsersController();

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

walletRoutes.post(
    "/",
    [JwtAuthorization.verifyToken],
    createWalletController.create
);
walletRoutes.get(
    "/",
    [JwtAuthorization.verifyToken],
    listWalletController.list
);
walletRoutes.get(
    "/:id",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    findWalletController.find
);
walletRoutes.get(
    "/:id/users",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    listWalletUsersController.listUsers
);
walletRoutes.put(
    "/:id",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    updateWalletController.update
);
walletRoutes.delete(
    "/:id",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteWalletController.delete
);
walletRoutes.post(
    "/:id/invite",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    inviteWalletController.invite
);
walletRoutes.post(
    "/invite",
    [JwtAuthorization.verifyToken],
    inviteWalletController.accept
);

walletRoutes.post(
    "/:id/transaction",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    createTransactionController.create
);

walletRoutes.post(
    "/:id/transactionrecurrencies",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    createTransactionRecurrenciesController.create
);

walletRoutes.put(
    "/:id/transaction/:tid",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    updateTransactionController.update
);

walletRoutes.put(
    "/:id/transactionrecurrencies/:trid",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    updateTransactionRecurrenciesController.update
);

walletRoutes.get(
    "/:id/transaction/:tid",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    findTransactionController.find
);

walletRoutes.get(
    "/:id/transactionrecurrencies/:tid",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    findTransactionRecurrenciesController.find
);

walletRoutes.delete(
    "/:id/transaction/:tid",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteTransactionController.delete
);

walletRoutes.delete(
    "/:id/transactionrecurrencies/:tid",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteTransactionRecurrenciesController.delete
);

walletRoutes.get(
    "/:id/transaction",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    listWalletTransactionController.list
);

walletRoutes.get(
    "/:id/transactionrecurrencies",
    [
        JwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
        CategoryBelongsWalletMiddleware.verifyCategoryBelongsWallet,
    ],
    listWalletTransactionRecurrenciesController.list
);

module.exports = walletRoutes;
