const { Router } = require("express");
const goalRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const CreateGoalController = require("../usecases/goal/createGoal/CreateGoalController");
const UpdateGoalController = require("../usecases/goal/updateGoal/UpdateGoalController");
const ListGoalController = require("../usecases/goal/listGoal/ListGoalController");
const FindGoalController = require("../usecases/goal/findGoal/FindGoalController");
const DeleteGoalController = require("../usecases/goal/deleteGoal/DeleteGoalController");

const goalCreateController = new CreateGoalController();
const goalUpdateController = new UpdateGoalController();
const listGoalController = new ListGoalController();
const findGoalController = new FindGoalController();
const deleteGoalController = new DeleteGoalController();

goalRoutes.post(
    "/",
    [AuthenticationMiddleware.verifyToken],
    goalCreateController.create
);
goalRoutes.put(
    "/:id",
    [AuthenticationMiddleware.verifyToken],
    goalUpdateController.update
);
goalRoutes.get(
    "/",
    [AuthenticationMiddleware.verifyToken],
    listGoalController.list
);
goalRoutes.get(
    "/:id",
    [AuthenticationMiddleware.verifyToken],
    findGoalController.find
);
goalRoutes.delete(
    "/:id",
    [AuthenticationMiddleware.verifyToken],
    deleteGoalController.delete
);

module.exports = goalRoutes;
