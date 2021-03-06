const sequelize = require("sequelize");
const { Op } = require("sequelize");

const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");
const { SortPaginate } = require("../../../helpers/SortPaginate");
const Wallet = require("../../../models/Wallet");
const UserHasWallet = require("../../../models/UserHasWallet");

class ListGoalUseCase {
    async list(query, userId) {
        let whre = {};

        if (query.description) {
            whre.description = sequelize.where(
                sequelize.fn("LOWER", sequelize.col("Goal.description")),
                "LIKE",
                "%" + query.description.toLowerCase() + "%"
            );
        }
        if (query.value) {
            whre.value = query.value;
        }
        if (query.status) {
            whre.status = query.status;
        }
        if (query.type) {
            whre.type = query.type;
        }
        if (query.expire_at_start || query.expire_at_end) {
            const startDate = query.expire_at_start
                ? new Date(query.expire_at_start)
                : new Date(null); // * new Date(null) == 1970
            const endDate = query.expire_at_end
                ? new Date(query.expire_at_end)
                : new Date("2999/01/01");
            whre.expire_at = { [Op.between]: [startDate, endDate] };
        }
        if (query.wallet_id) {
            const user = await UserHasWallet.findOne({
                where: {
                    user_id: userId,
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

        const attributes = Object.keys(Goal.getAttributes);
        const goalsQuantity = await Goal.count();
        const sortPaginateOptions = SortPaginate(
            query,
            attributes,
            goalsQuantity
        );
        if (query.created_at_start || query.created_at_end)
            whre.created_at = sortPaginateOptions.where.created_at;
        if (query.updated_at_start || query.updated_at_end)
            whre.updated_at = sortPaginateOptions.where.updated_at;
        if (query.deleted_at_start || query.deleted_at_end)
            whre.deleted_at = sortPaginateOptions.where.deleted_at;

        const goals = await Goal.findAndCountAll({
            where: whre,
            limit: sortPaginateOptions.limit,
            offset: sortPaginateOptions.offset,
            order: sortPaginateOptions.order,
            paranoid: sortPaginateOptions.paranoid,
            include: [
                {
                    model: Wallet,
                    as: "wallet",
                    attributes: {
                        include: ["id"],
                    },
                    required: true,
                    include: [
                        {
                            model: UserHasWallet,
                            as: "users",
                            required: true,
                            where: {
                                user_id: userId,
                            },
                            attributes: {
                                include: ["user_id"],
                            },
                        },
                    ],
                },
            ],
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError("Erro interno do servidor!", 500, error);
            }
        );

        return {
            count: goals.rows.length,
            total: goals.count,
            pages: Math.ceil(goals.count / sortPaginateOptions.limit),
            goals: goals.rows,
        };
    }
}

module.exports = ListGoalUseCase;
