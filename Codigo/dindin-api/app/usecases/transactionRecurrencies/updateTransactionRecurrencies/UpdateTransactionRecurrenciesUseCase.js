const AppError = require("../../../errors/AppError");

const FindTransactionRecurrenciesUseCase = require("../findTransactionRecurrencies/FindTransactionRecurrenciesUseCase");

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
        const findTransactionRecurrenciesUseCase =
            new FindTransactionRecurrenciesUseCase();
        const transactionRecurrencies =
            await findTransactionRecurrenciesUseCase.find(id, wallet_id);

        await transactionRecurrencies
            .update({
                value: value,
                description: description,
                day: day,
                interval: interval,
                category_id: category_id,
                expired_at: expired_at,
            })
            .catch((error) => {
                throw new AppError(error.message, 500, error);
            });

        return transactionRecurrencies;
    }
}

module.exports = UpdateTransactionRecurrenciesUseCase;
