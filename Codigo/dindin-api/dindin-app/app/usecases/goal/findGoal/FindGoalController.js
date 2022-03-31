const AppError = require("../../../errors/AppError");
const GoalFindUseCase = require("./FindGoalUseCase")

class FindGoalController {

  async find(request, response) {
    const id = request?.params?.id;
    if(!id || !(id > 0)) return new AppError("Please send a valid id on url", 500);
    const goalFindUseCase = new GoalFindUseCase();
    const Goal = await goalFindUseCase.find(
      id
    );
    return response.status(200).json(Goal);
  }

}

module.exports = FindGoalController;
