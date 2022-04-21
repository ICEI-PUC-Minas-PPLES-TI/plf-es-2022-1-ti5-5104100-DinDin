const AppError = require("../../../errors/AppError");

class DeleteGoalUseCase {
  async delete(goal) {

    await goal.destroy().catch(error => {
      throw new AppError("Erro interno do servidor!", 500, error);
    });
  }
}

module.exports = DeleteGoalUseCase;
