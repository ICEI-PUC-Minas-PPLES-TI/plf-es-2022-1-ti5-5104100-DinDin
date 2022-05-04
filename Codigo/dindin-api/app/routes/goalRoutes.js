const { Router } = require("express");
const goalRoutes = Router();

const jwtAuthorization = require("./jwtAuthorization");

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
    [jwtAuthorization.verifyToken],
    goalCreateController.create
);
goalRoutes.put(
    "/:id",
    [jwtAuthorization.verifyToken],
    goalUpdateController.update
);
goalRoutes.get("/", [jwtAuthorization.verifyToken], listGoalController.list);
goalRoutes.get("/:id", [jwtAuthorization.verifyToken], findGoalController.find);
goalRoutes.delete(
    "/:id",
    [jwtAuthorization.verifyToken],
    deleteGoalController.delete
);

module.exports = goalRoutes;
