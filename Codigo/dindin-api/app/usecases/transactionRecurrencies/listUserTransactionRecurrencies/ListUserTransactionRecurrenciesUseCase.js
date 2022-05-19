const sequelize = require("sequelize");
const { Op } = require("sequelize");

const AppError = require("../../../errors/AppError");
const { SortPaginate } = require("../../../helpers/SortPaginate");
const Category = require("../../../models/Category");

const TransactionRecurrencies = require("../../../models/TransactionRecurrencies");
const User = require("../../../models/User");
const Wallet = require("../../../models/Wallet");

class ListUserTransactionRecurrenciesUseCase {
    async list(query, user_id) {
        let whre = {};

        whre.user_id = user_id;
        if (query.wallet_id) whre.wallet_id = query.wallet_id;

        if (query.description) {
            whre.description = sequelize.where(
                sequelize.col("`TransactionRecurrencies`.`description`"),
                "LIKE",
                "%" + query.description.toLowerCase() + "%"
            );
        }

        if (query.value) whre.value = query.value;
        if (query.day) whre.day = query.day;
        if (query.interval) whre.interval = query.interval;

        if (query.category_id == 0) whre.category_id = { [Op.is]: null };
        else if (query.category_id) {
            const category = await Category.findOne({
                where: {
                    id: query.category_id,
                    user_id: user_id,
                },
            }).catch((error) => {
                throw new AppError(error.message, 500, error);
            });
            if (category) whre.category_id = query.category_id;
            else
                throw new AppError(
                    "User does not have permission for this Category!",
                    403
                );
        }

        if (query.expired_at_start || query.expired_at_end) {
            const startDate = query.expired_at_start
                ? new Date(query.expired_at_start)
                : new Date(null); // * new Date(null) == 1970
            const endDate = query.expired_at_end
                ? new Date(query.expired_at_end)
                : new Date("2999/01/01");
            whre.expired_at = { [Op.between]: [startDate, endDate] };
        }

        const attributes = Object.keys(TransactionRecurrencies.getAttributes);
        const walletQuantity = await TransactionRecurrencies.count();
        const sortPaginateOptions = SortPaginate(
            query,
            attributes,
            walletQuantity
        );
        if (query.created_at_start || query.created_at_end)
            whre.created_at = sortPaginateOptions.where.created_at;
        if (query.updated_at_start || query.updated_at_end)
            whre.updated_at = sortPaginateOptions.where.updated_at;
        if (query.deleted_at_start || query.deleted_at_end)
            whre.deleted_at = sortPaginateOptions.where.deleted_at;

        const transactionsRecurrencies =
            await TransactionRecurrencies.findAndCountAll({
                where: whre,
                limit: sortPaginateOptions.limit,
                offset: sortPaginateOptions.offset,
                order: sortPaginateOptions.order,
                paranoid: sortPaginateOptions.paranoid,
                include: [
                    {
                        model: User,
                        as: "user",
                    },
                    {
                        model: Wallet,
                        as: "wallet",
                    },
                    {
                        model: Category,
                        as: "category",
                    },
                ],
            }).catch((error) => {
                throw new AppError("Erro interno do servidor!", 500, error);
            });

        return {
            count: transactionsRecurrencies.rows.length,
            total: transactionsRecurrencies.count,
            pages: Math.ceil(
                transactionsRecurrencies.count / sortPaginateOptions.limit
            ),
            transactions_recurrencies: transactionsRecurrencies.rows,
        };
    }
}

module.exports = ListUserTransactionRecurrenciesUseCase;
