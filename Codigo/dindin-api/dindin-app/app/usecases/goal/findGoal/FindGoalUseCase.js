const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");

class FindGoalUseCase {
    async find(id) {
        const goal = await Goal.findOne({
            where: {
                id: id,
            },
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });
        if (goal) return goal;
        else throw new AppError("Goal not found or already deleted!", 404);
    }
}

module.exports = FindGoalUseCase;
