const AppError = require("../../../errors/AppError");
const GoalService = require("../../../services/goalServices");
const FindGoalUseCase = require("../findGoal/FindGoalUseCase");

class UpdateGoalUseCase {
    async update(id, description, value, type, expire_at) {
        const findGoalUseCase = new FindGoalUseCase();
        const goal = await findGoalUseCase.find(id);

        let status = undefined;

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
                    status,
                },
                {
                    where: { id: id },
                }
            )
            .catch(
                /* istanbul ignore next */ (error) => {
                    throw new AppError(error.message, 500, error);
                }
            );

        if (type === "A")
            new GoalService().updateAchievemetWalletGoals(goal.wallet_id);

        return goal;
    }
}

module.exports = UpdateGoalUseCase;
