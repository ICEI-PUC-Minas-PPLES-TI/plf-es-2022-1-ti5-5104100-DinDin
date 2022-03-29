const GoalFindUseCase = require("./FindGoalUseCase")

class FindGoalController {

  async find(request, response) {
    const id = request.params.id;
    const goalFindUseCase = new GoalFindUseCase();
    const Goal = await goalFindUseCase.find(
      id
    );
    return response.status(200).json(Goal);
  }

}

module.exports = FindGoalController;