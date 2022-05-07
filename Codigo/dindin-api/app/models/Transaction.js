const { Model, DataTypes } = require("sequelize");

const Category = require("./Category");
const TransactionRecurrencies = require("./TransactionRecurrencies");
const User = require("./User");
const Wallet = require("./Wallet");

class Transaction extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    field: "id",
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                    comment: "UUIDV4",
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
                category_id: {
                    field: "category_id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: true,
                    references: {
                        model: Category,
                        key: "id",
                    },
                },
                transaction_recurrencies_id: {
                    field: "transaction_recurrencies_id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: true,
                    references: {
                        model: TransactionRecurrencies,
                        key: "id",
                    },
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
                tableName: "transaction",
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

module.exports = Transaction;
