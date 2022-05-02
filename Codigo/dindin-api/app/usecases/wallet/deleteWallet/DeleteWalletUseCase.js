const AppError = require("../../../errors/AppError");
const FindWalletUseCase = require("../findWallet/FindWalletUseCase");

class DeleteWalletUseCase {
    async delete(id) {
        const findWalletUseCase = new FindWalletUseCase();
        const wallet = await findWalletUseCase.find(id);

        await wallet.destroy().catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });
    }
}

module.exports = DeleteWalletUseCase;
