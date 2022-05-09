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

module.exports = walletRoutes;
