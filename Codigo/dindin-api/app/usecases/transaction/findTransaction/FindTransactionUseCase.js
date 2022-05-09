const AppError = require("../../../errors/AppError");
const Transaction = require("../../../models/Transaction");

class FindTransactionUseCase {
    async find(id, wallet_id) {
        const transaction = await Transaction.findOne({
            where: { id: id, wallet_id: wallet_id },
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });
        if (!transaction)
            throw new AppError(
                "Transaction not found or already deleted!",
                404
            );

        return transaction;
    }
}

module.exports = FindTransactionUseCase;
