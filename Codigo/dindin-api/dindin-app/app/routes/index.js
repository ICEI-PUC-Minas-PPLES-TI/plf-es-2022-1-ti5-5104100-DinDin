const { Router } = require("express");
const router = Router();

const UserCreateAccountController = require("../usecases/createAccount/UserCreateAccountController");

const userCreateAccountController = new UserCreateAccountController();


// User
router.post('/user', userCreateAccountController.create)


module.exports = router;
