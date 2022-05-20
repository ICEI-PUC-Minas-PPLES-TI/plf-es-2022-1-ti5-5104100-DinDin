const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateTransactionUseCase = require("./CreateTransactionUseCase");

class CreateTransactionController {
    // * Route: /api/wallet/{id}/transaction
    // * {id} == wallet_id of the transaction
    async create(request, response) {
        const scheme = yup.object().shape({
            value: yup
                .number("'value' must be numeric!")
                .nullable(false)
                .required("'value' is a required field!"),
            description: yup
                .string("'description' must be string!")
                .max(30)
                .nullable(false)
                .required("'description' is a required field!"),
            date: yup
                .date("'date' must be date!")
                .nullable(false)
                .required("'date' is a required field!"),
            category_id: yup
                .string("'category_id' must be string!")
                .nullable(true),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        let { value, description, date, category_id } = request.body;
        const wallet_id = request.params.id; // * wallet_id of the transaction
        const user_id = request.userId;

        const createTransactionUseCase = new CreateTransactionUseCase();
        const transaction = await createTransactionUseCase.create(
            wallet_id,
            value,
            description,
            date,
            category_id,
            user_id
        );

        return response.status(201).json(transaction);
    }
}

module.exports = CreateTransactionController;
