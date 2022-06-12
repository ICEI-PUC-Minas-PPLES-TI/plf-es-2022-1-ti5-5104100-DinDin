const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");
const GoalService = require("../../../services/goalServices");

class CreateGoalUseCase {
    async create(description, value, type, expire_at, wallet_id) {
        const goal = await Goal.create({
            description,
            value,
            status: "PENDING",
            type,
            expire_at,
            wallet_id,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );

        if (type === "A")
            new GoalService().updateAchievemetWalletGoals(wallet_id);

        return { id: goal.id };
    }
}

module.exports = CreateGoalUseCase;
