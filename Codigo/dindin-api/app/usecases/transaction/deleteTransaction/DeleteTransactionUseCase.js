const AppError = require("../../../errors/AppError");
const FindTransactionUseCase = require("../findTransaction/FindTransactionUseCase");

class DeleteTransactionUseCase {
    async delete(tid, wid) {
        const findTransactionUseCase = new FindTransactionUseCase();
        const transaction = await findTransactionUseCase.find(tid, wid);

        await transaction.destroy().catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });
    }
}

module.exports = DeleteTransactionUseCase;
