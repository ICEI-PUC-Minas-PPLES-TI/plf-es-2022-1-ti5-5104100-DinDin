const AppError = require("../../../errors/AppError");
const User = require("../../../models/User");
const Wallet = require("../../../models/Wallet");

class FindWalletUseCase {
    async find(id) {
        const wallet = await Wallet.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: User,
                    as: "owner_user",
                },
            ],
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });
        if (wallet) return wallet;
        else throw new AppError("Wallet not found or already deleted!", 404);
    }
}

module.exports = FindWalletUseCase;
