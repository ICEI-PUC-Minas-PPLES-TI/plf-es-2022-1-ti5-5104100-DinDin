const yup = require("yup");

const AppError = require("../../../errors/AppError");
const ListWalletTransactionUseCase = require("./ListWalletTransactionUseCase");

const orderEnum = ["ASC", "DESC"];

class ListWalletTransactionController {
    // * Route: /api/wallet/{id}/transaction/
    // * {id} == wallet_id of the transactions
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
            category_id: yup.number("'category_id' must be numeric!"),

            description: yup.string("'description' must be string!").max(30),
            value: yup.number("'value' must be numeric!"),
            transaction_recurrencies_id: yup.number("'value' must be numeric!"),

            date_start: yup.date("'date_start' must be date!"),
            date_end: yup.date("'date_end' must be date!"),

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
        const wallet_id = request.params.id; // * wallet_id of the transaction
        const user_id = request.userId;

        const listWalletTransactionUseCase = new ListWalletTransactionUseCase();
        const transactions = await listWalletTransactionUseCase.list(
            request.query,
            wallet_id,
            user_id
        );

        return response.status(200).json(transactions);
    }
}

module.exports = ListWalletTransactionController;
