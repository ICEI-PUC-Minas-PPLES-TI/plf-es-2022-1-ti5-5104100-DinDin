const AppError = require("../../errors/AppError");
const Category = require("../../models/Category");

class CreateCategoryUseCase {
  async create(wallet_id, user_id, description, type, color) {
    const category = await Category.create({
      wallet_id,
      user_id,
      description,
      type,
      color,
    }).catch((error) => {
      throw new AppError(error.message, 500, error);
    });
    return { id: category.id };
  }
}

module.exports = CreateCategoryUseCase;
