const AppError = require("../../../errors/AppError");
const Wallet = require("../../../models/Wallet");


class FindWalletUseCase {
  async find(id) {
    const wallet = await Wallet.findOne({
      where: {
        id: id,
      },
    }).catch((error) => {
      throw new AppError(error.message, 500, error);
    });
    if (wallet)
      return wallet;
    else
      throw new AppError("Wallet not found or already deleted!", 404);
  }
}

module.exports = FindWalletUseCase;