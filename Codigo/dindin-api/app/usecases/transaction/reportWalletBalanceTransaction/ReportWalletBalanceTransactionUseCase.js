const sequelize = require("sequelize");
const { Op } = require("sequelize");

const AppError = require("../../../errors/AppError");
const { SortPaginate } = require("../../../helpers/SortPaginate");
const Category = require("../../../models/Category");

const Transaction = require("../../../models/Transaction");
const UserHasWallet = require("../../../models/UserHasWallet");

class ReportWalletBalanceTransactionUseCase {
    async report(query, user_id) {
        let whre = {};

        if (query.wallet_id) {
            const user = await UserHasWallet.findOne({
                where: {
                    user_id: user_id,
                    wallet_id: query.wallet_id,
                },
            }).catch(
                /* istanbul ignore next */ (error) => {
                    throw new AppError(error.message, 500, error);
                }
            );
            if (user) whre.wallet_id = query.wallet_id;
            else
                throw new AppError(
                    "User does not have this wallet permission!",
                    403
                );
        }

        // * If not send wallet_id, find all wallet_ids belongs to this user_id and SQL: `Transaction`.`wallet_id` IN ('2', '1'));
        if (!whre.wallet_id) {
            const wallets = await UserHasWallet.findAll({
                attributes: ["wallet_id"],
                where: {
                    user_id: user_id,
                },
            }).catch(
                /* istanbul ignore next */ (error) => {
                    throw new AppError(error.message, 500, error);
                }
            );
            let wallet_ids = [];
            for (let index = 0; index < wallets.length; index++) {
                wallet_ids.push(wallets[index].dataValues.wallet_id);
            }
            whre.wallet_id = wallet_ids;
        }

        if (query.description) {
            whre.description = sequelize.where(
                sequelize.fn(
                    "LOWER",
                    sequelize.col("`Transaction`.`description`")
                ),
                "LIKE",
                "%" + query.description.toLowerCase() + "%"
            );
        }

        if (query.value) whre.value = query.value;

        if (query.category_id == 0) whre.category_id = { [Op.is]: null };
        else if (query.category_id) {
            const category = await Category.findOne({
                where: {
                    id: query.category_id,
                    user_id: user_id,
                },
            }).catch(
                /* istanbul ignore next */ (error) => {
                    throw new AppError(error.message, 500, error);
                }
            );
            if (category) whre.category_id = query.category_id;
            else
                throw new AppError(
                    "User does not have permission for this Category!",
                    403
                );
        }

        if (query.transaction_recurrencies_id)
            whre.transaction_recurrencies_id =
                query.transaction_recurrencies_id;
        if (query.transaction_recurrencies_id == "null")
            whre.transaction_recurrencies_id = { [Op.is]: null };

        if (query.date_start || query.date_end) {
            const startDate = query.date_start
                ? new Date(query.date_start)
                : new Date(null); // * new Date(null) == 1970
            const endDate = query.date_end
                ? new Date(query.date_end)
                : new Date("2999/01/01");
            whre.date = { [Op.between]: [startDate, endDate] };
        }

        const attributes = Object.keys(Transaction.getAttributes);
        const transactionQuantity = await Transaction.count();
        const sortPaginateOptions = SortPaginate(
            query,
            attributes,
            transactionQuantity
        );
        if (query.created_at_start || query.created_at_end)
            whre.created_at = sortPaginateOptions.where.created_at;
        if (query.updated_at_start || query.updated_at_end)
            whre.updated_at = sortPaginateOptions.where.updated_at;
        if (query.deleted_at_start || query.deleted_at_end)
            whre.deleted_at = sortPaginateOptions.where.deleted_at;

        const transactionsWalletBalance = await Transaction.findAll({
            attributes: [
                [
                    sequelize.literal(
                        `SUM(CASE WHEN value > 0 THEN value ELSE 0 END)`
                    ),
                    "incoming",
                ],
                [
                    sequelize.literal(
                        `ABS(SUM(CASE WHEN value < 0 THEN value ELSE 0 END))`
                    ),
                    "outcoming",
                ],
            ],
            where: whre,
            paranoid: sortPaginateOptions.paranoid,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError("Erro interno do servidor!", 500, error);
            }
        );

        if (transactionsWalletBalance[0].dataValues.incoming == null)
            transactionsWalletBalance[0].dataValues.incoming = 0;
        if (transactionsWalletBalance[0].dataValues.outcoming == null)
            transactionsWalletBalance[0].dataValues.outcoming = 0;
        return transactionsWalletBalance[0];
    }
}

module.exports = ReportWalletBalanceTransactionUseCase;
