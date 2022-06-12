const AppError = require("../../../errors/AppError");
const FindTransactionRecurrenciesUseCase = require("../findTransactionRecurrencies/FindTransactionRecurrenciesUseCase");

class DeleteTransactionRecurrenciesUseCase {
    async delete(tid, wid) {
        const findTransactionRecurrenciesUseCase =
            new FindTransactionRecurrenciesUseCase();
        const transaction = await findTransactionRecurrenciesUseCase.find(
            tid,
            wid
        );

        await transaction.destroy().catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError("Erro interno do servidor!", 500, error);
            }
        );
    }
}

module.exports = DeleteTransactionRecurrenciesUseCase;
