const AppError = require("../../../errors/AppError");
const FindCategoryUseCase = require("../findCategory/FindCategoryUseCase");

class UpdateCategoryUseCase {
    async update(id, description, type, color) {
        const findCategoryUseCase = new FindCategoryUseCase();
        const category = await findCategoryUseCase.find(id);

        await category
            .update(
                {
                    description,
                    type,
                    color,
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

        return category;
    }
}

module.exports = UpdateCategoryUseCase;
