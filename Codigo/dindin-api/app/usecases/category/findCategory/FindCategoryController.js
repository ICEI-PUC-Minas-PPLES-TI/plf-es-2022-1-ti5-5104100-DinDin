const FindCategoryUseCase = require("./FindCategoryUseCase");
const AppError = require("../../../errors/AppError");

class FindCategoryController {
    async find(request, response) {
        const id = request.params.categoryId;
        if (!id || !(id > 0)) {
            throw new AppError("Please send a valid id on url", 422);
        }
        const findCategoryUseCase = new FindCategoryUseCase();
        const category = await findCategoryUseCase.find(id);

        return response.status(200).json(category);
    }
}

module.exports = FindCategoryController;
