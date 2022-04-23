const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");

class CreateGoalUseCase {
  async create(description, value, type, expire_at, wallet_id) {
    const goal = await Goal.create({
      description,
      value,
      status: "PENDING",
      type,
      expire_at,
      wallet_id,
    }).catch((error) => {
      throw new AppError(error.message, 500, error);
    });
    return { id: goal.id };
  }
}

module.exports = CreateGoalUseCase;
