const { Router } = require("express");
const walletRoutes = Router();

const jwtAuthorization = require("./jwtAuthorization");
const UserAccessWalletMiddleware = require("../middleware/UserAccessWalletMiddleware");

const CreateWalletController = require("../usecases/wallet/createWallet/CreateWalletController");
const FindWalletController = require("../usecases/wallet/findWallet/FindWalletController");
const ListWalletController = require("../usecases/wallet/listWallet/ListWalletController");
const UpdateWalletController = require("../usecases/wallet/updateWallet/UpdateWalletController");
const DeleteWalletController = require("../usecases/wallet/deleteWallet/DeleteWalletController");

const InviteWalletController = require("../usecases/wallet/inviteWallet/InviteWalletController");
const ListWalletUsersController = require("../usecases/wallet/listWalletUsers/ListWalletUsersController");
const DeleteWalletUsersController = require("../usecases/wallet/deleteWalletUsers/DeleteWalletUsersController");

const createWalletController = new CreateWalletController();
const listWalletController = new ListWalletController();
const updateWalletController = new UpdateWalletController();
const deleteWalletController = new DeleteWalletController();
const findWalletController = new FindWalletController();
const inviteWalletController = new InviteWalletController();
const listWalletUsersController = new ListWalletUsersController();
const deleteWalletUsersController = new DeleteWalletUsersController();

walletRoutes.post(
    "/",
    [jwtAuthorization.verifyToken],
    createWalletController.create
);
walletRoutes.get(
    "/",
    [jwtAuthorization.verifyToken],
    listWalletController.list
);
walletRoutes.get(
    "/:id",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    findWalletController.find
);
walletRoutes.get(
    "/:id/users",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    listWalletUsersController.listUsers
);
walletRoutes.delete(
    "/:id/users/:userId",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteWalletUsersController.delete
);
walletRoutes.put(
    "/:id",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    updateWalletController.update
);
walletRoutes.delete(
    "/:id",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteWalletController.delete
);
walletRoutes.post(
    "/:id/invite",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    inviteWalletController.invite
);
walletRoutes.post(
    "/invite",
    [jwtAuthorization.verifyToken],
    inviteWalletController.accept
);

module.exports = walletRoutes;
