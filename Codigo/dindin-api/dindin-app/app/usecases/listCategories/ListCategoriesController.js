const ListCategoriesUseCase = require("./ListCategoriesUseCase");

class ListCategoriesController {
    async findAll(request, response) {
        const findCategoryUseCase = new ListCategoriesUseCase();
        const category = await findCategoryUseCase.findAll();
        return response.status(200).json(category);
      }
}

module.exports = ListCategoriesController;