const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");
const Transaction = require("../../../models/Transaction");
const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");
const User = require("../../../models/User");
const Wallet = require("../../../models/Wallet");

class FindTransactionUseCase {
    async find(id, wallet_id) {
        const transaction = await Transaction.findOne({
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
                {
                    model: TransactionRecurrencies,
                    as: "transaction_recurrencies",
                },
            ],
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
