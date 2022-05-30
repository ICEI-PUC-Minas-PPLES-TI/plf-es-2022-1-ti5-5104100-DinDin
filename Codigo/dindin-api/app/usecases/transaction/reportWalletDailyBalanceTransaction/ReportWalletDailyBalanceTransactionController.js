const yup = require("yup");

const AppError = require("../../../errors/AppError");
const ReportWalletDailyBalanceTransactionUseCase = require("./ReportWalletDailyBalanceTransactionUseCase");

const orderEnum = ["ASC", "DESC"];

class ReportWalletDailyBalanceTransactionController {
    // * Route: /api/report/dailybalance
    async report(request, response) {
        const scheme = yup.object().shape({
            page: yup.number("'value' must be numeric!"),
            limit: yup.number("'value' must be numeric!"),
            attribute: yup.string("'attribute' must be one string!"),
            order: yup
                .mixed()
                .oneOf(
                    orderEnum,
                    `'order' must be one of these: ${orderEnum}.`
                ),
            wallet_id: yup.number("'wallet_id' must be numeric!"),

            description: yup.string("'description' must be string!").max(30),
            value: yup.number("'value' must be numeric!"),

            date_start: yup.date("'date_start' must be date!"),
            date_end: yup.date("'date_end' must be date!"),

            created_at_start: yup.date("'created_at_start' must be date!"),
            created_at_end: yup.date("'created_at_end' must be date!"),

            updated_at_start: yup.date("'updated_at_start' must be date!"),
            updated_at_end: yup.date("'updated_at_end' must be date!"),

            deleted_at_start: yup
                .date("'deleted_at_start' must be date!")
                .nullable(),
            deleted_at_end: yup
                .date("'deleted_at_end' must be date!")
                .nullable(),
        });

        try {
            await scheme.validate(request.query, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }
        const user_id = request.userId;

        const reportWalletDailyBalanceTransactionUseCase =
            new ReportWalletDailyBalanceTransactionUseCase();
        const transactionsBalance =
            await reportWalletDailyBalanceTransactionUseCase.report(
                request.query,
                user_id
            );

        return response.status(200).json(transactionsBalance);
    }
}

module.exports = ReportWalletDailyBalanceTransactionController;
