const AppError = require("../../errors/AppError");
const Goal = require("../../models/Goal");

class GoalCreateUseCase {
  async create(description, value, status, type, expire_at, wallet_id) {
      console.log(description, value, status, type, expire_at, wallet_id);
    const goal = await Goal.create({
      description,
      value,
      status,
      type,
      expire_at,
      wallet_id
    }).catch((error) => {
        console.log(goal);
        console.log(error);
      throw new AppError(error.message, 500, error);
    });
    console.log(goal);
    return { id: goal.id };
  }
}

module.exports = GoalCreateUseCase;
