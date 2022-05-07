const AppError = require("../../../errors/AppError");

const Transaction = require("../../../models/Transaction");

class UpdateTransactionUseCase {
    async update(id, wallet_id, value, description, date, category_id) {
        const transaction = await Transaction.update(
            {
                value: value,
                description: description,
                date: date,
                category_id: category_id,
            },
            { where: { id: id, wallet_id: wallet_id } }
        ).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        return { id: transaction.id };
    }
}

module.exports = UpdateTransactionUseCase;
