const DeleteCategoryUseCase = require("./DeleteCategoryUseCase");
const AppError = require("../../../errors/AppError");

class DeleteCategoryController {
    async delete(request, response) {
        const id = request?.params?.id;
        if (!id || !(id > 0))
            throw new AppError("Please send a valid id on url", 422);

        const deleteCategoryUseCase = new DeleteCategoryUseCase();
        await deleteCategoryUseCase.delete(id);

        return response.status(201).json({});
    }
}

module.exports = DeleteCategoryController;
