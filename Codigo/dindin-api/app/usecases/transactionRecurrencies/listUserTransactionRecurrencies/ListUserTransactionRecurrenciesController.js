const yup = require("yup");

const AppError = require("../../../errors/AppError");
const ListUserTransactionRecurrenciesUseCase = require("./ListUserTransactionRecurrenciesUseCase");

const orderEnum = ["ASC", "DESC"];
const intervalEnum = [null, "D", "W", "B", "M", "S", "A"];

class ListUserTransactionRecurrenciesController {
    // * Route: /api/transactionrecurrencies
    // * request.userId == user_id of the transactions
    async list(request, response) {
        const scheme = yup.object().shape({
            page: yup.number("'value' must be numeric!"),
            limit: yup.number("'value' must be numeric!"),
            attribute: yup.string("'attribute' must be one string!"),
            order: yup
                .mixed()
                .oneOf(
                    orderEnum,
                    `'order' must be one of these: ${orderEnum}.`
                ),
            wallet_id: yup.number("'wallet_id' must be numeric!"),
            category_id: yup.number("'category_id' must be numeric!"),

            description: yup.string("'description' must be string!").max(30),
            value: yup.number("'value' must be numeric!"),
            day: yup.number("'day' must be numeric!").min(1).max(31),
            interval: yup
                .mixed()
                .oneOf(
                    intervalEnum,
                    `'interval' must be one of these: ${intervalEnum}!`
                ),

            expired_at_start: yup.date("'expired_at_start' must be date!"),
            expired_at_end: yup.date("'expired_at_end' must be date!"),

            created_at_start: yup.date("'created_at_start' must be date!"),
            created_at_end: yup.date("'created_at_end' must be date!"),

            updated_at_start: yup.date("'updated_at_start' must be date!"),
            updated_at_end: yup.date("'updated_at_end' must be date!"),

            deleted_at_start: yup
                .date("'deleted_at_start' must be date!")
                .nullable(),
            deleted_at_end: yup
                .date("'deleted_at_end' must be date!")
                .nullable(),
        });

        try {
            await scheme.validate(request.query, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }
        const userId = request.userId;

        const listUserTransactionRecurrenciesUseCase =
            new ListUserTransactionRecurrenciesUseCase();
        const transactionsRecurrencies =
            await listUserTransactionRecurrenciesUseCase.list(
                request.query,
                userId
            );

        return response.status(200).json(transactionsRecurrencies);
    }
}

module.exports = ListUserTransactionRecurrenciesController;
