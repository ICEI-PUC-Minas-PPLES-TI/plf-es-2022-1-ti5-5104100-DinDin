const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateTransactionRecurrenciesUseCase = require("./CreateTransactionRecurrenciesUseCase");

const CreateTransactionUseCase = require("./CreateTransactionUseCase");

const intervalEnum = [null, "D", "W", "B", "M", "S", "A"];

class CreateTransactionController {
    // * Route: /api/wallet/{id}/transaction
    // * {id} == wallet_id of the transaction
    async create(request, response) {
        const scheme = yup.object().shape({
            value: yup
                .number("'value' must be numeric!")
                .required("'value' is a required field"),
            description: yup
                .string("'description' must be string!")
                .max(30)
                .required("'description' is a required field"),
            day: yup
                .number("'day' must be numeric!")
                .min(1)
                .max(31)
                .nullable(true),
            interval: yup
                .mixed()
                .oneOf(
                    intervalEnum,
                    `'interval' must be one of these: ${intervalEnum}.`
                )
                .nullable(true),
            expired_at: yup.date("'expired_at' must be date!").nullable(true),
            category_id: yup.number("'category_id' must be numeric!").min(1),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        let { value, description, day, interval, category_id, expired_at } =
            request.body;
        const wallet_id = request.params.id; // * wallet_id of the transaction
        const user_id = request.userId;

        if (interval && interval != "M" && interval != "D")
            throw new AppError(
                "ValidationError",
                422,
                "Only monthly interval = [M] and daily interval = [D] recurring transactions are implemented."
            );

        if (interval == "M" && !day) {
            throw new AppError(
                "ValidationError",
                422,
                "Monthly recurring transactions require the day of the month."
            );
        }
        if (day && !interval) interval = "D";

        const isRecurrencyTransaction = day || (interval && day) ? true : false;
        let transaction = null;

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
                category_id,
                user_id
            );
        }

        return response.status(201).json(transaction);
    }
}

module.exports = CreateTransactionController;
