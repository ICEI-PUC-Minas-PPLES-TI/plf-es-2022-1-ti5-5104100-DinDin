const AppError = require("../../errors/AppError");
const DeleteGoalUseCase = require("./DeleteGoalUseCase");
const GoalFindUseCase = require("../findGoal/FindGoalUseCase");

class DeleteGoalController {
  async update(request, response) {
    const id = request.params.id;
    //check if goal exists...
    const goalFindUseCase = new GoalFindUseCase();
    let findGoal = await goalFindUseCase.find(id);//throw execption if not found
    findGoal = null;
    goalFindUseCase = null;
    
    const deleteGoalUseCase = new DeleteGoalUseCase();
    const goal = await deleteGoalUseCase.deleteById(id);

    return response.status(201).json({
      goal,
    });
  }
}

module.exports = DeleteGoalController;
