const AppError = require("../../../errors/AppError");

const Transaction = require("../../../models/Transaction");

class CreateTransactionUseCase {
    async create(
        wallet_id,
        value,
        description,
        category_id,
        user_id,
        transaction_recurrencies_id
    ) {
        const transaction = await Transaction.create({
            wallet_id: wallet_id,
            value: value,
            description: description,
            category_id: category_id,
            user_id: user_id,
            transaction_recurrencies_id: transaction_recurrencies_id,
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        return { id: transaction.id };
    }
}

module.exports = CreateTransactionUseCase;
