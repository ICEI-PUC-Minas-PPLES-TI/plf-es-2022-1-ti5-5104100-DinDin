const AppError = require("../../../errors/AppError");
const FindCategoryUseCase = require("../findCategory/FindCategoryUseCase");
class DeleteCategoryUseCase {
    async delete(id) {
        const findCategoryUseCase = new FindCategoryUseCase();
        const category = await findCategoryUseCase.find(id);

        return await category.destroy().catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });
    }
}

module.exports = DeleteCategoryUseCase;
