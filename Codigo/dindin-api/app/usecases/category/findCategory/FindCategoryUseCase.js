const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");
const User = require("../../../models/User");

class FindCategoryUseCase {
    async find(id) {
        const category = await Category.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: User,
                    as: "user",
                },
                // !   {
                // !     model: Wallet,
                // !     as: "wallet",
                // ! },
            ],
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });
        if (category) return category;
        else throw new AppError("User not found!", 404);
    }
}

module.exports = FindCategoryUseCase;
