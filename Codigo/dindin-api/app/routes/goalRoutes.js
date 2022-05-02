const { Router } = require("express");
const goalRoutes = Router();

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

goalRoutes.post("/", goalCreateController.create);
goalRoutes.put("/:id", goalUpdateController.update);
goalRoutes.get("/", listGoalController.list);
goalRoutes.get("/:id", findGoalController.find);
goalRoutes.delete("/:id", deleteGoalController.delete);

module.exports = goalRoutes;
