const AppError = require("../../../errors/AppError");

const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");

class CreateTransactionRecurrenciesUseCase {
    async create(
        wallet_id,
        value,
        description,
        day,
        interval,
        category_id,
        user_id
    ) {
        const transactionRecurrencies = await TransactionRecurrencies.create({
            wallet_id: wallet_id,
            value: value,
            description: description,
            day: day,
            interval: interval,
            category_id: category_id,
            user_id: user_id,
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        return { id: transactionRecurrencies.id };
    }
}

module.exports = CreateTransactionRecurrenciesUseCase;
