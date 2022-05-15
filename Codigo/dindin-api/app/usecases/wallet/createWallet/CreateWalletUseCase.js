const AppError = require("../../../errors/AppError");
const Wallet = require("../../../models/Wallet");
const UserHasWallet = require("../../../models/UserHasWallet");

class CreateWalletUseCase {
    async create(description, initial_value, userID) {
        const wallet = await Wallet.create({
            description,
            shared: false,
            owner_id: userID,
            initial_value,
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        await UserHasWallet.create({
            wallet_id: wallet.id,
            user_id: userID,
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        return { id: wallet.id };
    }
}

module.exports = CreateWalletUseCase;
