const AppError = require("../../../errors/AppError");
const Wallet = require("../../../models/Wallet");
const UserHasWallet = require("../../../models/UserHasWallet");
const CreateTransactionUseCase = require("../../transaction/createTransaction/CreateTransactionUseCase");

class CreateWalletUseCase {
    async create(description, initial_value, userID) {
        const wallet = await Wallet.create({
            description,
            shared: false,
            owner_id: userID,
            initial_value,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );

        await UserHasWallet.create({
            wallet_id: wallet.id,
            user_id: userID,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );

        if (initial_value > 0) {
            const createTransactionUseCase = new CreateTransactionUseCase();
            const dt = new Date();
            await createTransactionUseCase.create(
                wallet.id,
                initial_value,
                "Initial Value",
                `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`,
                null,
                userID,
                null
            );
        }

        return { id: wallet.id };
    }
}

module.exports = CreateWalletUseCase;
