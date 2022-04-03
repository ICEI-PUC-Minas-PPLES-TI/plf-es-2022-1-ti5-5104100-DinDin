const AppError = require("../../errors/AppError");
const Category = require("../../models/Category")

class CreateCategoryUseCase {
    async create(name, color) {
        const category = await Category.create({
            name,
            color
        }).catch(error => {
            throw new AppError(error.message, 500, error);
        });
        return { 'id': category.id };
    }
}

module.exports = CreateCategoryUseCase;