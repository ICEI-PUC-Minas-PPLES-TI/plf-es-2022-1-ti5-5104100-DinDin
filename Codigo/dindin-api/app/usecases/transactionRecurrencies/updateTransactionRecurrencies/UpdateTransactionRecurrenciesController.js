const yup = require("yup");

const AppError = require("../../../errors/AppError");
const UpdateTransactionRecurrenciesUseCase = require("./UpdateTransactionRecurrenciesUseCase");

const intervalEnum = [null, "D", "W", "B", "M", "S", "A"];

class UpdateTransactionController {
    // * Route: /api/wallet/{id}/transactionrecurrencies/{trid}
    // * {id} == wallet_id of the transaction transactionrecurrencies
    // * {trid} == transaction transactionrecurrencies id to update
    async update(request, response) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scheme = yup.object().shape({
            value: yup
                .number("'value' must be numeric!")
                .notOneOf([0], "'value' cannot be 0!")
                .nullable(false),
            description: yup
                .string("'description' must be string!")
                .min(1)
                .max(30)
                .nullable(false),
            day: yup
                .number("'day' must be numeric!")
                .min(1)
                .max(31)
                .nullable(true),
            interval: yup
                .mixed()
                .oneOf(
                    intervalEnum,
                    `'interval' must be one of these: ${intervalEnum}!`
                )
                .nullable(false),
            expired_at: yup
                .date("'expired_at' must be date!")
                .min(today, "expire_at' cannot be in the past!")
                .nullable(true),
            category_id: yup
                .string("'category_id' must be string!")
                .nullable(true),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        let { value, description, day, interval, category_id, expired_at } =
            request.body;
        const wallet_id = request.params.id; // * wallet_id of the transaction
        const transaction_id = request.params.trid; // * id of the transaction to be update

        if (expired_at) expired_at += " 00:00";

        // TODO: need finish others intervals
        if (interval && interval != "M" && interval != "D")
            throw new AppError(
                "ValidationError",
                422,
                "Only monthly ('interval' = 'M') and daily ('interval' = 'D') recurring transactions are implemented!"
            );

        // * If the 'interval' is monthly (M), it is necessary to inform the 'day'
        if (interval == "M" && !day)
            throw new AppError(
                "ValidationError",
                422,
                "Monthly ('interval' = 'M') recurring transactions require the field 'day' of the month!"
            );

        // * If the 'interval' is daily (D), you don't need the 'day' because it's every day. Set 'day' null
        if (interval == "D") day = null;

        const updateTransactionRecurrenciesUseCase =
            new UpdateTransactionRecurrenciesUseCase();
        const transactionRecurrencies =
            await updateTransactionRecurrenciesUseCase.update(
                transaction_id,
                wallet_id,
                value,
                description,
                day,
                interval,
                category_id,
                expired_at
            );

        return response.status(200).json(transactionRecurrencies);
    }
}

module.exports = UpdateTransactionController;
