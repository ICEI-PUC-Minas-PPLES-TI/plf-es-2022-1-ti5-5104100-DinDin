const AppError = require("../errors/AppError");
const UserHasWallet = require("../models/UserHasWallet");

const verifyWalletCategoryPermission = async (request, response, next) => {
    //if(request.walletId);
    //console.log(request.walletId);
    next();
    if (!request.query.wallet_id) {
        throw new AppError("Especify a wallet_id!", 403);
    }

    const user = await UserHasWallet.findOne({
        where: {
            user_id: request.userId,
            wallet_id: request.walletId,
        },
    }).catch((error) => {
        throw new AppError(error.message, 500, error);
    });
    if (user) next();
    else throw new AppError("User does not have this wallet permission", 403);
};

const jwtAuthorization = {
    verifyWalletCategoryPermission,
};

module.exports = jwtAuthorization;
