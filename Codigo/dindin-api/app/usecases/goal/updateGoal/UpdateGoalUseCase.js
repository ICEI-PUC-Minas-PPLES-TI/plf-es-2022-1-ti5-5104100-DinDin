const AppError = require("../../../errors/AppError");
const FindGoalUseCase = require("../findGoal/FindGoalUseCase");

class UpdateGoalUseCase {
    async update(id, description, value, type, expire_at) {
        const findGoalUseCase = new FindGoalUseCase();
        const goal = await findGoalUseCase.find(id);

        await goal
            .update(
                {
                    description,
                    value,
                    type,
                    expire_at,
                },
                {
                    where: { id: id },
                }
            )
            .catch((error) => {
                throw new AppError(error.message, 500, error);
            });

        return goal;
    }
}

module.exports = UpdateGoalUseCase;
