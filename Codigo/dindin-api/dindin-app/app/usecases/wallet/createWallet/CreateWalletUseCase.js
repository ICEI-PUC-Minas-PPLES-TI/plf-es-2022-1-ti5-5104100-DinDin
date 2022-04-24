const AppError = require("../../../errors/AppError");
const Wallet = require("../../../models/Wallet");


class CreateWalletUseCase {
  async create(description, shared, initial_value) {
    // Still needs to add user to the wallet
    
    const wallet = await Wallet.create({
      description,
      shared,
      initial_value
    }).catch((error) => {
      throw new AppError(error.message, 500, error);
    });

    return { id: wallet.id };
  }
}

module.exports = CreateWalletUseCase;