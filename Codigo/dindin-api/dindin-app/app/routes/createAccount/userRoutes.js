const { Router } = require("express");
const userRoutes = Router();

const UserFindAccountController = require("../../usecases/findAccount/UserFindAccountController");
const UserCreateAccountController = require("../../usecases/createAccount/UserCreateAccountController");

const userFindAccountController = new UserFindAccountController();
const userCreateAccountController = new UserCreateAccountController();


userRoutes.get('/:id', userFindAccountController.find)
userRoutes.post('/', userCreateAccountController.create)


module.exports = userRoutes;
