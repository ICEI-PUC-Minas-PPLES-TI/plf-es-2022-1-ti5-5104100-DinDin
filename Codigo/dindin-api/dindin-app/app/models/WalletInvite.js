const { Model, DataTypes } = require("sequelize");

class WalletInvite extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    field: "id",
                    type: DataTypes.BIGINT.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                    validate: {
                        notEmpty: true,
                    },
                },
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
                code: {
                    type: DataTypes.STRING(8),
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                expire_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "wallet_invite",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
                timestamps: true,
                updatedAt: false,
                createdAt: "created_at",
            }
        );
    }
}

module.exports = WalletInvite;
