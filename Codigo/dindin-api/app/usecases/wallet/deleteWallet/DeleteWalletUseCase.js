const AppError = require("../../../errors/AppError");
const FindWalletUseCase = require("../findWallet/FindWalletUseCase");

class DeleteWalletUseCase {
    async delete(id, userID) {
        const findWalletUseCase = new FindWalletUseCase();
        const wallet = await findWalletUseCase.find(id);

        if (wallet.owner_id != userID)
            throw new AppError("You're not this wallet owner!", 403);

        await wallet.destroy().catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });
    }
}

module.exports = DeleteWalletUseCase;
