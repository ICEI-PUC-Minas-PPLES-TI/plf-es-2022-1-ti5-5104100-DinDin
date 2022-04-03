const AppError = require("../../errors/AppError");
class DeleteCategoryUseCase {
  async delete(category) {

    await category.destroy().catch(error => {
      throw new AppError("Erro interno do servidor!", 500, error);
    });
  }
}

module.exports = DeleteCategoryUseCase;