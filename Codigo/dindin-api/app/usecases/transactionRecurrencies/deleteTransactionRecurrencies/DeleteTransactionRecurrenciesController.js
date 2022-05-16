const yup = require("yup");

const AppError = require("../../../errors/AppError");

const DeleteTransactionRecurrenciesUseCase = require("./DeleteTransactionRecurrenciesUseCase");

class DeleteTransactionRecurrenciesController {
    // * Route: /api/wallet/{id}/transaction/{tid}
    // * {id} == wallet_id of the transaction
    // * {tid} == transaction id to update
    async delete(request, response) {
        const scheme = yup.object().shape({
            id: yup
                .number("'id' must be numeric!")
                .min(1)
                .required("'id' is a required field!"),
        });

        try {
            await scheme.validate(request.params, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        // * id == wallet_id of the transaction
        // * tid == transaction id to update
        const { id, tid } = request.params;

        const deleteTransactionRecurrenciesUseCase =
            new DeleteTransactionRecurrenciesUseCase();
        await deleteTransactionRecurrenciesUseCase.delete(tid, id);
        return response.status(204).json();
    }
}

module.exports = DeleteTransactionRecurrenciesController;
