const AppError = require("../../../errors/AppError");

const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");

class UpdateTransactionRecurrenciesUseCase {
    async update(
        id,
        wallet_id,
        value,
        description,
        day,
        interval,
        category_id,
        expired_at
    ) {
        const transactionRecurrencies = await TransactionRecurrencies.update(
            {
                value: value,
                description: description,
                day: day,
                interval: interval,
                category_id: category_id,
                expired_at: expired_at,
            },
            { where: { id: id, wallet_id: wallet_id } }
        ).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        return { id: transactionRecurrencies.id };
    }
}

module.exports = UpdateTransactionRecurrenciesUseCase;
