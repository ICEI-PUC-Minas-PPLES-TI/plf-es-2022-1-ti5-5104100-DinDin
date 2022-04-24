const { Router } = require("express");
const walletRoutes = Router();

const jwtAuthorization = require("./jwtAuthorization");
const UserAccessWalletMiddleware = require("../middleware/UserAccessWalletMiddleware");

const CreateWalletController = require("../usecases/wallet/createWallet/CreateWalletController");
const FindWalletController = require("../usecases/wallet/findWallet/FindWalletController");
const ListWalletController = require("../usecases/wallet/listWallet/ListWalletController");
const UpdateWalletController = require("../usecases/wallet/updateWallet/UpdateWalletController");
const DeleteWalletController = require("../usecases/wallet/deleteWallet/DeleteWalletController");

const createWalletController = new CreateWalletController();
const listWalletController = new ListWalletController();
const updateWalletController = new UpdateWalletController();
const deleteWalletController = new DeleteWalletController();
const findWalletController = new FindWalletController();

walletRoutes.post('/', [jwtAuthorization.verifyToken], createWalletController.create)
walletRoutes.get('/', [jwtAuthorization.verifyToken], listWalletController.list)
walletRoutes.get('/:id', [jwtAuthorization.verifyToken, UserAccessWalletMiddleware.verifyWalletPermission], findWalletController.find)
walletRoutes.put('/:id', [jwtAuthorization.verifyToken, UserAccessWalletMiddleware.verifyWalletPermission], updateWalletController.update)
walletRoutes.delete('/:id', [jwtAuthorization.verifyToken, UserAccessWalletMiddleware.verifyWalletPermission], deleteWalletController.delete)


module.exports = walletRoutes;
