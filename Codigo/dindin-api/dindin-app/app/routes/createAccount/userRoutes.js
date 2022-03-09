const { Router } = require("express");
const userRoutes = Router();

const UserCreateAccountController = require("../../usecases/createAccount/UserCreateAccountController");
const userCreateAccountController = new UserCreateAccountController();


userRoutes.post('/', userCreateAccountController.create)


module.exports = userRoutes;
