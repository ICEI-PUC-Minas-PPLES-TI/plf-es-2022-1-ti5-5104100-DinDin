const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");

const Transaction = require("../../../models/Transaction");
const GoalService = require("../../../services/goalServices");
const FindWalletUseCase = require("../../wallet/findWallet/FindWalletUseCase");
const ListWalletUsersUseCase = require("../../wallet/listWalletUsers/ListWalletUsersUseCase");
const { firebaseServices } = require("../../../services/firebaseServices");

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
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );

        // don't put a await in this, of it will slow down the create transaction process
        new GoalService().updateAchievemetWalletGoals(wallet_id);

        const findWalletUseCase = new FindWalletUseCase();
        const wallet = await findWalletUseCase.find(wallet_id);
        if (wallet.shared) {
            const listWalletUsersUseCase = new ListWalletUsersUseCase();
            const members = await listWalletUsersUseCase.list(wallet_id);
            members.users.forEach(async (element) => {
                if (element.id != user_id) {
                    await firebaseServices.sendCloudMessage(
                        element.id,
                        `New Transaction on ${wallet.description}`,
                        `${element.name} added ${description} - $${value}`
                    );
                }
            });
        }

        return { id: transaction.id };
    }
}

module.exports = CreateTransactionUseCase;
