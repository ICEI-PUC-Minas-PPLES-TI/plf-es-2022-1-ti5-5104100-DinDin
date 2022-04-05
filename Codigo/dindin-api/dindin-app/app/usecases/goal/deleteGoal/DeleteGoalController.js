const DeleteGoalUseCase = require("./DeleteGoalUseCase");
const FindGoalUseCase = require("../findGoal/FindGoalUseCase");

class DeleteGoalController {
  async delete(request, response) {
    const id = request?.params?.id;
    if (!id || !(id > 0))
      return new AppError("Please send a valid id on url", 500);
    //check if goal exists...
    const findGoalUseCase = new FindGoalUseCase();
    const findGoal = await findGoalUseCase.find(id);

    const deleteGoalUseCase = new DeleteGoalUseCase();
    const goal = await deleteGoalUseCase.delete(findGoal);

    return response.status(204).json({
      goal,
    });
  }
}

module.exports = DeleteGoalController;
