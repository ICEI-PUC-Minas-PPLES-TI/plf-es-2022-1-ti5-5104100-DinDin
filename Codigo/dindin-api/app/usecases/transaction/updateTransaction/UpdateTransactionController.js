const yup = require("yup");

const AppError = require("../../../errors/AppError");
const UpdateTransactionRecurrenciesUseCase = require("./UpdateTransactionRecurrenciesUseCase");

const UpdateTransactionUseCase = require("./UpdateTransactionUseCase");

const intervalEnum = [null, "D", "W", "B", "M", "S", "A"];

class UpdateTransactionController {
    // * Route: /api/wallet/{id}/transaction/{tid}
    // * {id} == wallet_id of the transaction
    // * {tid} == transaction id to update
    async update(request, response) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scheme = yup.object().shape({
            value: yup.number("'value' must be numeric!"),
            description: yup.string("'description' must be string!").max(30),
            day: yup
                .number("'day' must be numeric!")
                .min(1)
                .max(31)
                .nullable(true),
            date: yup.date("'date' must be date!").nullable(true),
            interval: yup
                .mixed()
                .oneOf(
                    intervalEnum,
                    `'interval' must be one of these: ${intervalEnum}!`
                )
                .nullable(true),
            expired_at: yup
                .date("'expired_at' must be date!")
                .min(today, "expire_at' cannot be in the past!")
                .nullable(true),
            category_id: yup
                .number("'category_id' must be numeric!")
                .min(1)
                .nullable(true),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        let {
            value,
            description,
            day,
            date,
            interval,
            category_id,
            expired_at,
        } = request.body;
        const wallet_id = request.params.id; // * wallet_id of the transaction
        const transaction_id = request.params.tid; // * id of the transaction to be update

        // TODO: need finish others intervals
        if (interval && interval != "M" && interval != "D")
            throw new AppError(
                "ValidationError",
                422,
                "Only monthly 'interval' = [M] and daily 'interval' = [D] recurring transactions are implemented."
            );

        // * If the 'interval' is monthly (M), it is necessary to inform the 'day'
        if (interval == "M" && !day) {
            throw new AppError(
                "ValidationError",
                422,
                "Monthly ('interval' = [M]) recurring transactions require the field 'day' of the month."
            );
        }

        // * If the 'interval' is daily (D), you don't need the 'day' because it's every day. Set 'day' null
        if (interval == "D") day = null;

        const isRecurrencyTransaction =
            day || interval || expired_at !== undefined ? true : false;
        let transaction = null;

        if (!isRecurrencyTransaction && !date) {
            throw new AppError(
                "ValidationError",
                422,
                "To update a non-recurring transaction you must enter a 'date'."
            );
        }

        if (isRecurrencyTransaction) {
            const updateTransactionRecurrenciesUseCase =
                new UpdateTransactionRecurrenciesUseCase();
            transaction = await updateTransactionRecurrenciesUseCase.update(
                transaction_id,
                wallet_id,
                value,
                description,
                day,
                interval,
                category_id,
                expired_at
            );
        } else {
            const updateTransactionUseCase = new UpdateTransactionUseCase();
            transaction = await updateTransactionUseCase.update(
                transaction_id,
                wallet_id,
                value,
                description,
                date,
                category_id
            );
        }

        return response.status(200).json(transaction);
    }
}

module.exports = UpdateTransactionController;
