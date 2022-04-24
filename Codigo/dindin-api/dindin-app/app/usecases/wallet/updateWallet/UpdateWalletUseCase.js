const AppError = require("../../../errors/AppError");
const FindWalletUseCase = require("../findWallet/FindWalletUseCase");


class UpdateWalletUseCase {
  async update(id, description) {
    const findWalletUseCase = new FindWalletUseCase();
    const wallet = await findWalletUseCase.find(id);

    wallet.update({
      description
    },
      {
        where: { id: id }
      }).catch((error) => {
        throw new AppError(error.message, 500, error);
      });

    return wallet;
  }
}

module.exports = UpdateWalletUseCase;