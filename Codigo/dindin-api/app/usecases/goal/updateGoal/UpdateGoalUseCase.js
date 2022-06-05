const AppError = require("../../../errors/AppError");
const GoalService = require("../../../services/goalServices");
const FindGoalUseCase = require("../findGoal/FindGoalUseCase");

class UpdateGoalUseCase {
    async update(id, description, value, type, expire_at, wallet_id) {
        const findGoalUseCase = new FindGoalUseCase();
        const goal = await findGoalUseCase.find(id);

        let status = goal.status;

        // when a goal is updated to saving and the expire_at is not past,
        // the goal status should be updated to "PENDING"
        if (
            type === "B" &&
            ((expire_at != null &&
                new Date(expire_at).getTime() > Date.now()) ||
                (expire_at === null &&
                    new Date(goal.expire_at).getTime() > Date.now))
        ) {
            status = "PENDING";
        }

        await goal
            .update(
                {
                    description,
                    value,
                    type,
                    expire_at,
                    wallet_id,
                    status,
                },
                {
                    where: { id: id },
                }
            )
            .catch((error) => {
                throw new AppError(error.message, 500, error);
            });

        if (type === "A")
            new GoalService().updateAchievemetWalletGoals(wallet_id);

        return goal;
    }
}

module.exports = UpdateGoalUseCase;
