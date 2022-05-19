const AppError = require("../errors/AppError");
const Category = require("../models/Category");

const verifyCategoryBelongsWallet = async (request, response, next) => {
    let category_id = request.body.category_id;
    if (!category_id) return next(); // * optional, if not sent, do not check
    const category = await Category.findOne({
        where: {
            id: category_id,
            wallet_id: request.params.id,
        },
    }).catch((error) => {
        throw new AppError(error.message, 500, error);
    });
    if (category) next();
    else
        throw new AppError(
            "Category does not have permission for this wallet!",
            403
        );
};

const CategoryBelongsWalletMiddleware = {
    verifyCategoryBelongsWallet,
};

module.exports = CategoryBelongsWalletMiddleware;
