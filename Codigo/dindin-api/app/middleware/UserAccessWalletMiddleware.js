const AppError = require("../errors/AppError");
const UserHasWallet = require("../models/UserHasWallet");

const verifyWalletPermission = async (request, response, next) => {
    const user = await UserHasWallet.findOne({
        where: {
            user_id: request.userId,
            wallet_id: request.params.id,
        },
    }).catch(
        /* istanbul ignore next */ (error) => {
            throw new AppError(error.message, 500, error);
        }
    );
    if (user) next();
    else throw new AppError("User does not have this wallet permission!", 403);
};

const UserAccessWalletMiddleware = {
    verifyWalletPermission,
};

module.exports = UserAccessWalletMiddleware;
