const AppError = require("../../../errors/AppError");
const GoalService = require("../../../services/goalServices");
const Category = require("../../../models/Category");

const FindTransactionUseCase = require("../findTransaction/FindTransactionUseCase");

class UpdateTransactionUseCase {
    async update(id, wallet_id, value, description, date, category_id) {
        const findTransactionUseCase = new FindTransactionUseCase();
        const transaction = await findTransactionUseCase.find(id, wallet_id);

        if (category_id == 0) category_id = null;

        if (category_id) {
            const category = await Category.findOne({
                where: {
                    id: category_id,
                },
                raw: true,
            });
            if (value && category.type == "OUT" && value > 0)
                throw new AppError(
                    "You cannot update an income Transaction (value greater than 0) with a outcome Category.",
                    422
                );
            else if (
                !value &&
                category.type == "OUT" &&
                transaction.dataValues.value > 0
            )
                throw new AppError(
                    "You cannot update an income Transaction (value greater than 0) with a outcome Category.",
                    422
                );

            if (value && category.type == "IN" && value < 0)
                throw new AppError(
                    "You cannot update an outcome Transaction (value less than 0) with an income Category.",
                    422
                );
            else if (
                !value &&
                category.type == "IN" &&
                transaction.dataValues.value < 0
            )
                throw new AppError(
                    "You cannot update an outcome Transaction (value less than 0) with an income Category.",
                    422
                );
        }

        await transaction
            .update({
                value: value,
                description: description,
                date: date,
                category_id: category_id,
            })
            .catch(
                /* istanbul ignore next */ (error) => {
                    throw new AppError(error.message, 500, error);
                }
            );

        new GoalService().updateAchievemetWalletGoals(wallet_id);

        return transaction;
    }
}

module.exports = UpdateTransactionUseCase;
