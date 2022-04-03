const AppError = require("../../errors/AppError");
const Category = require("../../models/Category")

class UpdateCategoryUseCase {
    async update(id, name, color) {
        const category = await Category.update({
            name,
            color
        },
            {
                where: { id: id }
            }).catch(error => {
                throw new AppError(error.message, 500, error);
            });
        return { 'id': category};
    }
}

module.exports = UpdateCategoryUseCase