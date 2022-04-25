const AppError = require("../../../errors/AppError");
const FindGoalUseCase = require("./FindGoalUseCase");

class FindGoalController {
    async find(request, response) {
        const id = request.params.id;
        if (!id || !(id > 0))
            throw new AppError("Please send a valid id on url", 404);
        const findGoalUseCase = new FindGoalUseCase();
        const goal = await findGoalUseCase.find(id);
        return response.status(200).json(goal);
    }
}

module.exports = FindGoalController;
