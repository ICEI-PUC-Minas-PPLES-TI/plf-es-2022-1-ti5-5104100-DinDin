const AppError = require("../errors/AppError");
const Category = require("../models/Category");

const verifyCategoryBelongsUser = async (request, response, next) => {
    let category_id = request.body.category_id;
    if (!category_id) category_id = request.query.category_id;
    if (category_id == "null") category_id = undefined;
    if (!category_id) return next(); // * optional, if not sent, do not check
    console.log(category_id, request.userId);
    const category = await Category.findOne({
        where: {
            id: category_id,
            user_id: request.userId,
        },
    }).catch((error) => {
        throw new AppError(error.message, 500, error);
    });
    if (category) next();
    else
        throw new AppError(
            "User does not have permission for this Category!",
            403
        );
};

const CategoryBelongsUserMiddleware = {
    verifyCategoryBelongsUser,
};

module.exports = CategoryBelongsUserMiddleware;
