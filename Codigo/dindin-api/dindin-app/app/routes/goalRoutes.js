const { Router } = require("express");
const goalRoutes = Router();

// const UserFindAccountController = require("../usecases/findAccount/UserFindAccountController");
const GoalCreateController = require("../usecases/createGoal/GoalCreateController");
const GoalUpdateController = require("../usecases/updateGoal/GoalUpdateController");
// const AuthenticateController = require("../usecases/authenticate/AuthenticateController");

// const userFindAccountController = new UserFindAccountController();
const goalCreateController = new GoalCreateController();
const goalUpdateController = new GoalUpdateController();

// const authenticateController = new AuthenticateController();


// goalRoutes.get('/:id', userFindAccountController.find)
goalRoutes.post('/', goalCreateController.create)
goalRoutes.post('/:id', goalUpdateController.update)
// goalRoutes.post('/auth', authenticateController.handle)


module.exports = goalRoutes;
