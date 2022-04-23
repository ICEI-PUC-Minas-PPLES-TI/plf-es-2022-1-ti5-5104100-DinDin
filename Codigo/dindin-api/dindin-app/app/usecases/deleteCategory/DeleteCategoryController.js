const DeleteCategoryUseCase = require("./DeleteCategoryUseCase");
const FindCategoryUseCase = require("../findCategory/FindCategoryUseCase");

class DeleteCategoryController {
  async delete(request, response) {
    const id = request?.params?.id;
    if (!id || !(id > 0))
      return new AppError("Please send a valid id on url", 500);
    //check if Category exists...
    const findCategoryUseCase = new FindCategoryUseCase();
    const findCategory = await findCategoryUseCase.find(id);

    const deleteCategoryUseCase = new DeleteCategoryUseCase();
    const Category = await deleteCategoryUseCase.delete(findCategory);

    return response.status(201).json({
      Category,
    });
  }
}

module.exports = DeleteCategoryController;
