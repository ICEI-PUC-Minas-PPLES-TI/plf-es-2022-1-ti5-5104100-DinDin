const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateTransactionRecurrenciesUseCase = require("./CreateTransactionRecurrenciesUseCase");

const CreateTransactionUseCase = require("./CreateTransactionUseCase");

const intervalEnum = [null, "D", "W", "B", "M", "S", "A"];

class CreateTransactionController {
    // * Route: /api/wallet/{id}/transaction
    // * {id} == wallet_id of the transaction
    async create(request, response) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scheme = yup.object().shape({
            value: yup
                .number("'value' must be numeric!")
                .required("'value' is a required field!"),
            description: yup
                .string("'description' must be string!")
                .max(30)
                .required("'description' is a required field!"),
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
            category_id: yup.number("'category_id' must be numeric!").min(1),
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
        const user_id = request.userId;

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

        const isRecurrencyTransaction = day || (interval && day) ? true : false;
        let transaction = null;

        if (!isRecurrencyTransaction && !date) {
            throw new AppError(
                "ValidationError",
                422,
                "To create a non-recurring transaction you must enter a 'date'."
            );
        }

        if (isRecurrencyTransaction) {
            const createTransactionRecurrenciesUseCase =
                new CreateTransactionRecurrenciesUseCase();
            transaction = await createTransactionRecurrenciesUseCase.create(
                wallet_id,
                value,
                description,
                day,
                interval,
                category_id,
                expired_at,
                user_id
            );
        } else {
            const createTransactionUseCase = new CreateTransactionUseCase();
            transaction = await createTransactionUseCase.create(
                wallet_id,
                value,
                description,
                date,
                category_id,
                user_id
            );
        }

        return response.status(201).json(transaction);
    }
}

module.exports = CreateTransactionController;
