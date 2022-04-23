const AppError = require("../../../errors/AppError");
const FindGoalUseCase = require("../findGoal/FindGoalUseCase");

class DeleteGoalUseCase {
  async delete(id) {

    const findGoalUseCase = new FindGoalUseCase();
    const goal = await findGoalUseCase.find(id);

    await goal.destroy().catch(error => {
      throw new AppError("Erro interno do servidor!", 500, error);
    });
  }
}

module.exports = DeleteGoalUseCase;
