const AppError = require("../../../errors/AppError");
const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");

class FindTransactionRecurrenciesUseCase {
    async find(id, wallet_id) {
        const transactionRecurrencies = await TransactionRecurrencies.findOne({
            where: { id: id, wallet_id: wallet_id },
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });
        if (!transactionRecurrencies)
            throw new AppError(
                "Transaction recurrencies not found or already deleted!",
                404
            );

        return transactionRecurrencies;
    }
}

module.exports = FindTransactionRecurrenciesUseCase;
