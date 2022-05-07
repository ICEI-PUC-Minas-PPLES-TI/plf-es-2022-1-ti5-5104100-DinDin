const { Model, DataTypes } = require("sequelize");

const Category = require("./Category");
const User = require("./User");
const Wallet = require("./Wallet");

class TransactionRecurrencies extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    field: "id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                },
                wallet_id: {
                    field: "wallet_id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: Wallet,
                        key: "id",
                    },
                },
                user_id: {
                    field: "user_id",
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: User,
                        key: "id",
                    },
                },
                description: {
                    field: "description",
                    type: DataTypes.STRING(30),
                    allowNull: false,
                    notEmpty: true,
                },
                value: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                day: {
                    type: DataTypes.TINYINT.UNSIGNED,
                    allowNull: true,
                },
                interval: {
                    type: DataTypes.ENUM,
                    values: ["D", "W", "B", "M", "S", "A"],
                    allowNull: false,
                    comment:
                        "D == daily, W == weekly, B == biweekly, M == monthly, S == semi-annual, A == annual",
                },
                category_id: {
                    field: "category_id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: true,
                    references: {
                        model: Category,
                        key: "id",
                    },
                },
                expired_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                tableName: "transaction_recurrencies",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
                timestamps: true, // deleted_at and updatedAt need this
                paranoid: true, // deleted_at need this
                createdAt: "created_at",
                updatedAt: "updated_at",
                deletedAt: "deleted_at", // .destroy() and .destroy(); to softdelete
                sequelize,
            }
        );
    }
}

module.exports = TransactionRecurrencies;
