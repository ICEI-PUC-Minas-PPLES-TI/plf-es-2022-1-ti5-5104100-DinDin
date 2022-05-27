const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { getCurrentDateFromDatabase } = require("../../../database");

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
            }).catch((error) => {
                throw new AppError(error.message, 500, error);
            });
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
            }).catch((error) => {
                throw new AppError(error.message, 500, error);
            });
            let wallet_ids = [];
            for (let index = 0; index < wallets.length; index++) {
                wallet_ids.push(wallets[index].dataValues.wallet_id);
            }
            whre.wallet_id = wallet_ids;
        }

        if (query.description) {
            whre.description = Sequelize.where(
                Sequelize.fn(
                    "LOWER",
                    Sequelize.col("`Transaction`.`description`")
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

        if (query.transaction_recurrencies_id)
            whre.transaction_recurrencies_id =
                query.transaction_recurrencies_id;
        if (query.transaction_recurrencies_id == "null")
            whre.transaction_recurrencies_id = { [Op.is]: null };

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

        console.log(sortPaginateOptions.order);

        const dateFilter = "`Transaction`.`date`";
        const transactionsWalletDailyBalance = await Transaction.findAll({
            attributes: [
                [Sequelize.literal(`DATE(${dateFilter})`), "dt"],
                [
                    Sequelize.literal(
                        `SUM(CASE WHEN value > 0 THEN value ELSE 0 END)`
                    ),
                    "incoming",
                ],
                [
                    Sequelize.literal(
                        `ABS(SUM(CASE WHEN value < 0 THEN value ELSE 0 END))`
                    ),
                    "outcoming",
                ],
            ],
            where: [
                whre,

                Sequelize.literal(
                    `DATE(${dateFilter}) BETWEEN DATE(NOW() - INTERVAL 7 DAY) AND DATE(NOW())`
                ),
            ],
            group: Sequelize.literal(`DATE(${dateFilter})`),
            paranoid: sortPaginateOptions.paranoid,
            order: sortPaginateOptions.order,
            raw: true,
        }).catch((error) => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });

        const currentDate = new Date(await getCurrentDateFromDatabase());
        currentDate.setSeconds(currentDate.getSeconds() + 1);
        const sevenDaysAgo = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 7
        );

        const orderDefined = sortPaginateOptions.order[0][1];
        let indexStart;
        let indexEnd;
        if (orderDefined == "ASC") {
            indexStart = 1;
            indexEnd = 7;
        } else {
            indexStart = 7;
            indexEnd = 1;
        }

        // * Daily balance with reseted incoming and outcoming transactions
        const resetDays = [];
        for (
            let index = indexStart;
            orderDefined == "ASC" ? index <= indexEnd : index >= indexEnd;
            orderDefined == "ASC" ? index++ : index--
        ) {
            const dayToAdd = new Date(
                sevenDaysAgo.getFullYear(),
                sevenDaysAgo.getMonth(),
                sevenDaysAgo.getDate() + index
            );
            const year = dayToAdd.getFullYear();
            const month = dayToAdd.getMonth() + 1;
            const day = dayToAdd.getDate() + 1;
            const dayToAddWithoutTime =
                year +
                "-" +
                (month < 10 ? "0" + month : month) +
                "-" +
                (day < 10 ? "0" + day : day);
            const newElement = {
                dt: dayToAddWithoutTime,
                incoming: 0,
                outcoming: 0,
            };
            let existsInDatabase = false;
            for (let i = 0; i < transactionsWalletDailyBalance.length; i++) {
                if (transactionsWalletDailyBalance[i].dt == newElement.dt) {
                    resetDays.push(transactionsWalletDailyBalance[i]);
                    existsInDatabase = true;
                }
            }
            if (!existsInDatabase) resetDays.push(newElement);
        }

        return resetDays;
    }
}

module.exports = ReportWalletBalanceTransactionUseCase;
