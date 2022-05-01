const { Router } = require("express");
const userRoutes = Router();

const jwtAuthorization = require("./jwtAuthorization");

// ! const jwtAuthorization = require("./jwtAuthorization");

const FindUserAccountController = require("../usecases/user/findAccount/FindUserAccountController");
const CreateUserAccountController = require("../usecases/user/createAccount/CreateUserAccountController");
const UpdateUserAccountController = require("../usecases/user/updateAccount/UpdateUserAccountController");
const AuthenticateUserAccountController = require("../usecases/user/authenticate/AuthenticateUserAccountController");
const FindMyUserAccountController = require("../usecases/user/findMyAccount/FindMyUserAccountController");

const findUserAccountController = new FindUserAccountController();
const findMyUserAccountController = new FindMyUserAccountController();
const createUserAccountController = new CreateUserAccountController();
const updateUserAccountController = new UpdateUserAccountController();
const authenticateUserAccountController =
    new AuthenticateUserAccountController();

userRoutes.get(
    "/:id",
    [jwtAuthorization.verifyToken],
    findUserAccountController.find
);

userRoutes.get(
    "/",
    [jwtAuthorization.verifyToken],
    findMyUserAccountController.find
);

userRoutes.post("/", createUserAccountController.create);
userRoutes.put(
    "/:id",
    [jwtAuthorization.verifyToken],
    updateUserAccountController.update
);
userRoutes.post("/auth", authenticateUserAccountController.login);

module.exports = userRoutes;
