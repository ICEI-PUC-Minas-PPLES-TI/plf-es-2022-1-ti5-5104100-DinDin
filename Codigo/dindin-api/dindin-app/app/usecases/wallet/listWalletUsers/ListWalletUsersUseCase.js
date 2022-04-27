const User = require("../../../models/User");
const UserHasWallet = require("../../../models/UserHasWallet");
const AppError = require("../../../errors/AppError");

class ListWalletUsersUseCase {
    async list(walletId) {
        const limit = 50;
        const users = await User.findAndCountAll({
            limit: limit,
            attributes: ["id", "name", "email"],
            include: [
                {
                    model: UserHasWallet,
                    as: "wallets",
                    where: {
                        wallet_id: walletId,
                    },
                },
            ],
        }).catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });

        return {
            count: limit,
            total: limit,
            users: users.rows,
        };
    }
}

module.exports = ListWalletUsersUseCase;
