const yup = require("yup");

const AppError = require("../../../errors/AppError");

const FindTransactionUseCase = require("./FindTransactionUseCase");

class FindTransactionController {
    // * Route: /api/wallet/{id}/transaction/{tid}
    // * {id} == wallet_id of the transaction
    // * {tid} == transaction uuid to update
    async find(request, response) {
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
        // * tid == transaction uuid to update
        const { id, tid } = request.params;

        const findTransactionUseCase = new FindTransactionUseCase();
        const transaction = await findTransactionUseCase.find(tid, id);
        return response.status(200).json(transaction);
    }
}

module.exports = FindTransactionController;
