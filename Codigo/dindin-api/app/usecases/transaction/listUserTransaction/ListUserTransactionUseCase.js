const sequelize = require("sequelize");
const { Op } = require("sequelize");

const AppError = require("../../../errors/AppError");
const { SortPaginate } = require("../../../helpers/SortPaginate");

const Transaction = require("../../../models/Transaction");

class ListWalletTransactionUseCase {
    async list(query, user_id) {
        let whre = {};

        whre.user_id = user_id;

        if (query.description) {
            whre.description = sequelize.where(
                sequelize.fn("LOWER", sequelize.col("description")),
                "LIKE",
                "%" + query.description.toLowerCase() + "%"
            );
        }

        if (query.value) whre.value = query.value;

        if (query.category_id) whre.category_id = query.category_id;
        if (query.category_id == "null") whre.category_id = { [Op.is]: null };

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

        const transactions = await Transaction.findAndCountAll({
            where: whre,
            limit: sortPaginateOptions.limit,
            offset: sortPaginateOptions.offset,
            order: sortPaginateOptions.order,
            paranoid: sortPaginateOptions.paranoid,
        }).catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });

        return {
            count: transactions.rows.length,
            total: transactions.count,
            pages: Math.ceil(transactions.count / sortPaginateOptions.limit),
            transactions: transactions.rows,
        };
    }
}

module.exports = ListWalletTransactionUseCase;
