const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateTransactionRecurrenciesUseCase = require("./CreateTransactionRecurrenciesUseCase");

const CreateTransactionUseCase = require("./CreateTransactionUseCase");

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
            day: yup.number("'day' must be numeric!").min(1).nullable(true),
            interval: yup
                .number("'interval' must be numeric!")
                .min(1)
                .nullable(true),
            category_id: yup.number("'category_id' must be numeric!").min(1),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { value, description, day, interval, category_id } = request.body;
        const wallet_id = request.params.id; // * wallet_id of the transaction
        const user_id = request.userId;

        // * If the transaction is recurrency, need the day and interval
        if ((day && !interval) || (!day && interval)) {
            throw new AppError(
                "ValidationError",
                422,
                "If the transaction is recurrency, need the 'day' and 'interval'"
            );
        }

        const isRecurrencyTransaction = day && interval ? true : false;
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

        return response.status(201).json({
            transaction,
        });
    }
}

module.exports = CreateTransactionController;
