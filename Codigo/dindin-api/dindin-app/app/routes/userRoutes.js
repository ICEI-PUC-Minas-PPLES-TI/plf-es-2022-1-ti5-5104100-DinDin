const { Router } = require("express");
const userRoutes = Router();

const jwtAuthorization = require("./jwtAuthorization");

const UserFindAccountController = require("../usecases/user/findAccount/FindUserAccountController");
const UserCreateAccountController = require("../usecases/user/createAccount/CreateUserAccountController");
const AuthenticateController = require("../usecases/user/authenticate/AuthenticateUserAccountController");

const userFindAccountController = new UserFindAccountController();
const userCreateAccountController = new UserCreateAccountController();
const authenticateController = new AuthenticateController();


userRoutes.get('/:id', /*[jwtAuthorization.verifyToken],*/ userFindAccountController.find)
userRoutes.post('/', userCreateAccountController.create)
userRoutes.post('/auth', authenticateController.handle)


module.exports = userRoutes;
