const { Router } = require("express");
const walletRoutes = Router();

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

walletRoutes.post('/', createWalletController.create)
walletRoutes.get('/', listWalletController.list)
walletRoutes.get('/:id', findWalletController.find)
walletRoutes.put('/:id', updateWalletController.update)
walletRoutes.delete('/:id', deleteWalletController.delete)


module.exports = walletRoutes;
