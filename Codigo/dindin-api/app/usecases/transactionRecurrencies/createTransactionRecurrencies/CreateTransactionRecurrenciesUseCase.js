const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");

const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");

class CreateTransactionRecurrenciesUseCase {
    async create(
        wallet_id,
        value,
        description,
        day,
        interval,
        category_id,
        expired_at,
        user_id
    ) {
        if (category_id == 0) category_id = null;

        if (category_id) {
            const category = await Category.findOne({
                where: {
                    id: category_id,
                },
                raw: true,
            });
            if (category.type == "OUT" && value > 0)
                throw new AppError(
                    "You cannot create an income Transaction Recurencie (value greater than 0) with a outcome Category.",
                    422
                );
            if (category.type == "IN" && value < 0)
                throw new AppError(
                    "You cannot create an income Transaction Recurencie (value less than 0) with an income Category.",
                    422
                );
        }

        const transactionRecurrencies = await TransactionRecurrencies.create({
            wallet_id: wallet_id,
            value: value,
            description: description,
            day: day,
            interval: interval,
            category_id: category_id,
            expired_at: expired_at,
            user_id: user_id,
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        return { id: transactionRecurrencies.id };
    }
}

module.exports = CreateTransactionRecurrenciesUseCase;
