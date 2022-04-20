const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");

class UpdateGoalUseCase {
  async update(id, description, value, type, expire_at, wallet_id) {

    await Goal.update({
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
    const goal = Goal.findByPk(id);
    return goal;
  }
}

module.exports = UpdateGoalUseCase;
