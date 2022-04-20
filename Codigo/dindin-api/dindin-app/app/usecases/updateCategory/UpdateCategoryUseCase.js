const AppError = require("../../errors/AppError");
const Category = require("../../models/Category");
const FindCategoryUseCase = require("../findCategory/FindCategoryUseCase");

class UpdateCategoryUseCase {
    async update(id,wallet_id,user_id,name,description,type,color) {
        const category = await Category.update({
            wallet_id,
            user_id,
            name,
            description,
            type,
            color
        },
            {
                where: { id: id }
            }).catch(error => {
                throw new AppError(error.message, 500, error);
            });
        const findCategoryUseCase = new FindCategoryUseCase();
        const categoryUpdated = findCategoryUseCase.find(id);
        
        return categoryUpdated;
    }
}

module.exports = UpdateCategoryUseCase