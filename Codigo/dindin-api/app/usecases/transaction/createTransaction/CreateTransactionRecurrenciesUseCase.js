const AppError = require("../../../errors/AppError");

const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");
const CreateTransactionUseCase = require("./CreateTransactionUseCase");

class CreateTransactionRecurrenciesUseCase {
    async create(
        wallet_id,
        value,
        description,
        day,
        recurrence,
        category_id,
        user_id
    ) {
        const transactionRecurrencies = await TransactionRecurrencies.create({
            wallet_id: wallet_id,
            value: value,
            description: description,
            day: day,
            recurrence: recurrence,
            category_id: category_id,
            user_id: user_id,
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        const createTransactionUseCase = new CreateTransactionUseCase();
        const transaction = await createTransactionUseCase.create({
            wallet_id: wallet_id,
            value: value,
            description: description,
            category_id: category_id,
            user_id: user_id,
            transaction_recurrencies_id: transactionRecurrencies.id,
        });

        return { id: transaction.id };
    }
}

module.exports = CreateTransactionRecurrenciesUseCase;
