const yup = require("yup");

const AppError = require("../../../errors/AppError");
const UpdateTransactionUseCase = require("./UpdateTransactionUseCase");

class UpdateTransactionController {
    // * Route: /api/wallet/{id}/transaction/{tid}
    // * {id} == wallet_id of the transaction
    // * {tid} == transaction id to update
    async update(request, response) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scheme = yup.object().shape({
            value: yup.number("'value' must be numeric!").nullable(false),
            description: yup
                .string("'description' must be string!")
                .min(1)
                .max(30)
                .nullable(false),
            date: yup.date("'date' must be date!").nullable(false),
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

        let { value, description, date, category_id } = request.body;
        const wallet_id = request.params.id; // * wallet_id of the transaction
        const transaction_id = request.params.tid; // * id of the transaction to be update

        const updateTransactionUseCase = new UpdateTransactionUseCase();
        const transaction = await updateTransactionUseCase.update(
            transaction_id,
            wallet_id,
            value,
            description,
            date,
            category_id
        );

        return response.status(200).json(transaction);
    }
}

module.exports = UpdateTransactionController;
