const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");
const FindUserAccountUseCase = require("../../user/findAccount/FindUserAccountUseCase");
// ! const FindWalletUseCase = require("../../user/findWallet/FindWalletUseCase");

class CreateCategoryUseCase {
    async create(wallet_id, user_id, description, type, color) {
        // ! const findWalletUseCase = new FindWalletUseCase();
        // ! await findWalletUseCase.find(wallet_id);

        const findUserAccountUseCase = new FindUserAccountUseCase();
        await findUserAccountUseCase.find(user_id);

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
