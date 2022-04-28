const { Model, DataTypes } = require("sequelize");

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
                    validate: {
                        notEmpty: true,
                    },
                },
                user_id: {
                    field: "user_id",
                    type: DataTypes.INTEGER(11).UNSIGNED,
                    autoIncrement: false,
                    primaryKey: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                    validate: {
                        notEmpty: true,
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
