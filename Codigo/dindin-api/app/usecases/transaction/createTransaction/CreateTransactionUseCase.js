const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");

const Transaction = require("../../../models/Transaction");
const GoalService = require("../../../services/goalServices");

class CreateTransactionUseCase {
    async create(
        wallet_id,
        value,
        description,
        date,
        category_id,
        user_id,
        transaction_recurrencies_id
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
                    "You cannot create an income Transaction (value greater than 0) with a outcome Category.",
                    422
                );
            if (category.type == "IN" && value < 0)
                throw new AppError(
                    "You cannot create an income Transaction (value less than 0) with an income Category.",
                    422
                );
        }

        const transaction = await Transaction.create({
            wallet_id: wallet_id,
            value: value,
            description: description,
            date: date,
            category_id: category_id,
            user_id: user_id,
            transaction_recurrencies_id: transaction_recurrencies_id,
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        // don't put a await in this, of it will slow down the create transaction process
        new GoalService().updateAchievemetWalletGoals(wallet_id);

        return { id: transaction.id };
    }
}

module.exports = CreateTransactionUseCase;
