const DeleteGoalUseCase = require("./DeleteGoalUseCase");

class DeleteGoalController {
    async delete(request, response) {
        const id = request.params.id;
        // não precisa mais de validar id já que o middleware de acesso detecta quando um goal não existe
        // if (!id || !(id > 0))
        //     throw new AppError("Please send a valid id on url", 422);

        const deleteGoalUseCase = new DeleteGoalUseCase();
        const goal = await deleteGoalUseCase.delete(id);

        return response.status(204).json({
            goal,
        });
    }
}

module.exports = DeleteGoalController;
