const AppError = require("../../../errors/AppError");
const FindCategoryUseCase = require("../findCategory/FindCategoryUseCase");
class DeleteCategoryUseCase {
    async delete(id) {
        const findCategoryUseCase = new FindCategoryUseCase();
        const category = await findCategoryUseCase.find(id);
        await category.destroy().catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });
        return category;
    }
}

module.exports = DeleteCategoryUseCase;
