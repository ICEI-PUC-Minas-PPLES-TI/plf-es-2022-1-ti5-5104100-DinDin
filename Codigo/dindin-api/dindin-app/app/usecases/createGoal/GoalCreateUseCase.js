const AppError = require("../../errors/AppError");
const Goal = require("../../models/Goal");

class GoalCreateUseCase {
  async create(description, value, status, type, expire_at, wallet_id) {
    const goal = await Goal.create({
      description,
      value,
      status,
      type,
      expire_at,
      wallet_id
    }).catch((error) => {
      throw new AppError(error.message, 500, error);
    });
    return { id: goal.id };
  }
}

module.exports = GoalCreateUseCase;
