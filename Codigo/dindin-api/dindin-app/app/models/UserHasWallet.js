const { Model, DataTypes } = require("sequelize");
const Wallet = require("./Wallet");
const User = require("./User");

class UserHasWallet extends Model {
    static init(sequelize) {
        super.init(
            {
                wallet_id: {
                    field: "wallet_id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    autoIncrement: false,
                    primaryKey: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                    references: {
                        model: Wallet,
                        key: "id",
                    },
                },
                user_id: {
                    field: "user_id",
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: false,
                    primaryKey: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                    references: {
                        model: User,
                        key: "id",
                    },
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "user_has_wallet",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
                timestamps: true,
                updatedAt: false,
                createdAt: "created_at",
            }
        );
    }
}

module.exports = UserHasWallet;
