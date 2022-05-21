const { Router } = require("express");
const userRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const CreateUserAccountController = require("../usecases/user/createAccount/CreateUserAccountController");
const UpdateUserAccountController = require("../usecases/user/updateAccount/UpdateUserAccountController");
const AuthenticateUserAccountController = require("../usecases/user/authenticate/AuthenticateUserAccountController");
const FindMyUserAccountController = require("../usecases/user/findMyAccount/FindMyUserAccountController");

const findMyUserAccountController = new FindMyUserAccountController();
const createUserAccountController = new CreateUserAccountController();
const updateUserAccountController = new UpdateUserAccountController();
const authenticateUserAccountController =
    new AuthenticateUserAccountController();

userRoutes.get(
    "/",
    [AuthenticationMiddleware.verifyToken],
    findMyUserAccountController.find
);

userRoutes.post("/", createUserAccountController.create);
userRoutes.put(
    "/",
    [AuthenticationMiddleware.verifyToken],
    updateUserAccountController.update
);
userRoutes.post("/auth", authenticateUserAccountController.login);

module.exports = userRoutes;
