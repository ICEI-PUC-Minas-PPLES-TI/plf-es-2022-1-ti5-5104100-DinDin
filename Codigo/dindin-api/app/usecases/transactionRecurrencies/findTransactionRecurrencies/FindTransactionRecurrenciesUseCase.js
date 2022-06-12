const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");
const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");
const User = require("../../../models/User");
const Wallet = require("../../../models/Wallet");

class FindTransactionRecurrenciesUseCase {
    async find(id, wallet_id) {
        const transactionRecurrencies = await TransactionRecurrencies.findOne({
            where: { id: id, wallet_id: wallet_id },
            include: [
                {
                    model: User,
                    as: "user",
                },
                {
                    model: Wallet,
                    as: "wallet",
                },
                {
                    model: Category,
                    as: "category",
                },
            ],
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );
        if (!transactionRecurrencies)
            throw new AppError(
                "Transaction recurrencies not found or already deleted!",
                404
            );

        return transactionRecurrencies;
    }
}

module.exports = FindTransactionRecurrenciesUseCase;
