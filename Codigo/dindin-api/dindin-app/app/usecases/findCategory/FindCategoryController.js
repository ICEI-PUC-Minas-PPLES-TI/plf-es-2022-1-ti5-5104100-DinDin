const FindCategoryUseCase = require("./FindCategoryUseCase");

class FindCategoryController {
  async find(request, response) {
    const id = request.params.id;
    const findCategoryUseCase = new FindCategoryUseCase();
    const category = await findCategoryUseCase.find(id);
    return response.status(200).json(category);
  }
}

module.exports = FindCategoryController;
