const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");
const FindGoalUseCase = require("../findGoal/FindGoalUseCase");

class UpdateGoalUseCase {
  async update(id, description, value, type, expire_at, wallet_id) {
    const findGoalUseCase = new FindGoalUseCase();
    const goal = await findGoalUseCase.find(id);

    goal.update({
      description,
      value,
      type,
      expire_at,
      wallet_id
    },
      {
        where: { id: id }
      }).catch((error) => {
        throw new AppError(error.message, 500, error);
      });

    return goal;
  }
}

module.exports = UpdateGoalUseCase;
