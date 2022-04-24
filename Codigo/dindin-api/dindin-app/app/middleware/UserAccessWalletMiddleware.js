const AppError = require("../errors/AppError");
const UserHasWallet = require("../models/UserHasWallet");

const verifyWalletPermission = async (request, response, next) => {
    console.log(request.userId, request.params.id)
    const user = await UserHasWallet.findOne({
        where: {
          user_id: request.userId,
          wallet_id: request.params.id
        },
      }).catch((error) => {
        throw new AppError(error.message, 500, error);
      });
    if(user)
      next();
    else
      throw new AppError('User does not have this wallet permission', 403, error);
};

const jwtAuthorization = {
    verifyWalletPermission
};

module.exports = jwtAuthorization;
