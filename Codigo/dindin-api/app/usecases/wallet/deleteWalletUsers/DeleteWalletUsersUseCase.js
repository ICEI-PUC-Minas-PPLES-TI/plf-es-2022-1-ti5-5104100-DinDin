const AppError = require("../../../errors/AppError");
const FindWalletUseCase = require("../findWallet/FindWalletUseCase");
const UserHasWallet = require("../../../models/UserHasWallet");

class DeleteWalletUsersUseCase {
    async delete(id, userId, userLoggedID) {
        const findWalletUseCase = new FindWalletUseCase();
        const wallet = await findWalletUseCase.find(id);

        if (wallet.owner_id != userLoggedID)
            throw new AppError("You're not this wallet owner!", 403);

        if (wallet.owner_id == userId)
            throw new AppError("You cant remove yourself!", 405);

        UserHasWallet.destroy({
            where: {
                wallet_id: id,
                user_id: userId,
            },
        });
    }
}

module.exports = DeleteWalletUsersUseCase;
