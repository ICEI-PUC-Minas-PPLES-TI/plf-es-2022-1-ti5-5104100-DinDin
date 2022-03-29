const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");

class DeleteGoalUseCase {
    async deleteById(id) {

        await Goal.destroy({
            where: {
            id: id
            }
        }).catch(error => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });
        }
}

module.exports = DeleteGoalUseCase;
