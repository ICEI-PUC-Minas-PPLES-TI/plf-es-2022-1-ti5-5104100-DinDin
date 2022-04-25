const AppError = require("../../../errors/AppError");
const FindCategoryUseCase = require("../findCategory/FindCategoryUseCase");

class UpdateCategoryUseCase {
    async update(id, description, type, color) {
        //check if category exists...
        const findCategoryUseCase = new FindCategoryUseCase();
        const category = await findCategoryUseCase.find(id);

        category
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
            .catch((error) => {
                console.log("\n\n\nbuasdasdasd\n\n\n\n");
                throw new AppError(error.message, 500, error);
            });

        return category;
    }
}

module.exports = UpdateCategoryUseCase;
