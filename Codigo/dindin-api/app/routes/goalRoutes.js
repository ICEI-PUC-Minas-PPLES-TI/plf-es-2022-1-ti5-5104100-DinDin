const { Router } = require("express");
const goalRoutes = Router();

const JwtAuthorization = require("../middleware/JwtMiddleware");

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
    [JwtAuthorization.verifyToken],
    goalCreateController.create
);
goalRoutes.put(
    "/:id",
    [JwtAuthorization.verifyToken],
    goalUpdateController.update
);
goalRoutes.get("/", [JwtAuthorization.verifyToken], listGoalController.list);
goalRoutes.get("/:id", [JwtAuthorization.verifyToken], findGoalController.find);
goalRoutes.delete(
    "/:id",
    [JwtAuthorization.verifyToken],
    deleteGoalController.delete
);

module.exports = goalRoutes;
