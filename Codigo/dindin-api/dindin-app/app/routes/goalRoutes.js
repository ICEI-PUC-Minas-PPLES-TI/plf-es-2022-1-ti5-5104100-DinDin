const { Router } = require("express");
const goalRoutes = Router();

// const UserFindAccountController = require("../usecases/findAccount/UserFindAccountController");
const CreateGoalController = require("../usecases/goal/createGoal/CreateGoalController");
const UpdateGoalController = require("../usecases/goal/updateGoal/UpdateGoalController");
const ListGoalController = require("../usecases/goal/listGoal/ListGoalController");
const FindGoalController = require("../usecases/goal/findGoal/FindGoalController");
// const AuthenticateController = require("../usecases/authenticate/AuthenticateController");

// const userFindAccountController = new UserFindAccountController();
const goalCreateController = new CreateGoalController();
const goalUpdateController = new UpdateGoalController();
const listGoalController = new ListGoalController();
const findGoalController = new FindGoalController();
// const authenticateController = new AuthenticateController();


// goalRoutes.get('/:id', userFindAccountController.find)
goalRoutes.post('/', goalCreateController.create)
goalRoutes.post('/:id', goalUpdateController.update)
goalRoutes.get('/', listGoalController.list)
goalRoutes.get('/:id', findGoalController.find)
// goalRoutes.post('/auth', authenticateController.handle)


module.exports = goalRoutes;
