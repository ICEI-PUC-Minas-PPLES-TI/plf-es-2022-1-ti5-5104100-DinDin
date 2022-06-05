const AppError = require("../../../errors/AppError");
const GoalService = require("../../../services/goalServices");

const FindTransactionUseCase = require("../findTransaction/FindTransactionUseCase");

class UpdateTransactionUseCase {
    async update(id, wallet_id, value, description, date, category_id) {
        const findTransactionUseCase = new FindTransactionUseCase();
        const transaction = await findTransactionUseCase.find(id, wallet_id);

        if (category_id == 0) category_id = null;

        await transaction
            .update({
                value: value,
                description: description,
                date: date,
                category_id: category_id,
            })
            .catch((error) => {
                throw new AppError(error.message, 500, error);
            });

        new GoalService().updateAchievemetWalletGoals(wallet_id);

        return transaction;
    }
}

module.exports = UpdateTransactionUseCase;
