const ListGoalUseCase = require("./ListGoalUseCase")

class ListGoalController {

  async list(request, response) {
    const listGoalUseCase = new ListGoalUseCase();

    const goals = await listGoalUseCase.list(request.query);

    return response.status(200).json(goals);
  }

}

module.exports = ListGoalController;
