const AppError = require("../../errors/AppError");
const Category = require("../../models/Category");

class ListCategoriesUseCase {
  async findAll() {
    const categories = await Category.findAll().catch((error) => {
      throw new AppError(error.message, 500, error);
    });
    if (categories) return categories;
    else throw new AppError("Categories not created yet!", 404);
  }
}

module.exports = ListCategoriesUseCase;
