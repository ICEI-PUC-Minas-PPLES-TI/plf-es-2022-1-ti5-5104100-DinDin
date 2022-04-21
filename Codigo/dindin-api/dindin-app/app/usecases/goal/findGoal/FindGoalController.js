const AppError = require("../../../errors/AppError");
const FindGoalUseCase = require("./FindGoalUseCase")

class FindGoalController {

  async find(request, response) {
    const id = request?.params?.id;
    if (!id || !(id > 0)) return new AppError("Please send a valid id on url", 500);
    const findGoalUseCase = new FindGoalUseCase();
    const goal = await findGoalUseCase.find(
      id
    );
    return response.status(200).json(goal);
  }

}

module.exports = FindGoalController;
