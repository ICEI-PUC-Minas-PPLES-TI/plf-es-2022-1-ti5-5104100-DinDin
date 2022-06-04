const AppError = require("../../../errors/AppError");
const Category = require("../../../models/Category");

const FindTransactionRecurrenciesUseCase = require("../findTransactionRecurrencies/FindTransactionRecurrenciesUseCase");

class UpdateTransactionRecurrenciesUseCase {
    async update(
        id,
        wallet_id,
        value,
        description,
        day,
        interval,
        category_id,
        expired_at
    ) {
        const findTransactionRecurrenciesUseCase =
            new FindTransactionRecurrenciesUseCase();
        const transactionRecurrencies =
            await findTransactionRecurrenciesUseCase.find(id, wallet_id);

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
                    "You cannot update an income Transaction Recurrencie (value greater than 0) with a outcome Category.",
                    422
                );
            else if (
                !value &&
                category.type == "OUT" &&
                transactionRecurrencies.dataValues.value > 0
            )
                throw new AppError(
                    "You cannot update an income Transaction Recurrencie (value greater than 0) with a outcome Category.",
                    422
                );

            if (value && category.type == "IN" && value < 0)
                throw new AppError(
                    "You cannot update an outcome Transaction Recurrencie (value less than 0) with an income Category.",
                    422
                );
            else if (
                !value &&
                category.type == "IN" &&
                transactionRecurrencies.dataValues.value < 0
            )
                throw new AppError(
                    "You cannot update an outcome Transaction Recurrencie (value less than 0) with an income Category.",
                    422
                );
        }

        await transactionRecurrencies
            .update({
                value: value,
                description: description,
                day: day,
                interval: interval,
                category_id: category_id,
                expired_at: expired_at,
            })
            .catch((error) => {
                throw new AppError(error.message, 500, error);
            });

        return transactionRecurrencies;
    }
}

module.exports = UpdateTransactionRecurrenciesUseCase;
