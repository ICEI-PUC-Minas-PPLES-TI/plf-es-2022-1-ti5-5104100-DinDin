const { Router } = require("express");
const userRoutes = Router();

const UserFindAccountController = require("../usecases/findAccount/UserFindAccountController");
const UserCreateAccountController = require("../usecases/createAccount/UserCreateAccountController");
const AuthenticateController = require("../usecases/authenticate/AuthenticateController");

const userFindAccountController = new UserFindAccountController();
const userCreateAccountController = new UserCreateAccountController();
const authenticateController = new AuthenticateController();


userRoutes.get('/:id', userFindAccountController.find)
userRoutes.post('/', userCreateAccountController.create)
userRoutes.post('/auth', authenticateController.handle)


module.exports = userRoutes;
