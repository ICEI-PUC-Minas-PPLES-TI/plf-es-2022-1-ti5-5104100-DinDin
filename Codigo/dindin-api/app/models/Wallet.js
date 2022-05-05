const { Model, DataTypes } = require("sequelize");

class Wallet extends Model {
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
                },
                description: {
                    field: "description",
                    type: DataTypes.STRING(30),
                    notEmpty: true,
                    allowNull: false,
                },
                shared: {
                    field: "shared",
                    type: DataTypes.BOOLEAN,
                    notEmpty: true,
                    allowNull: false,
                    defaultValue: false,
                },
                initial_value: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                    defaultValue: 0,
                    notEmpty: true,
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
                sequelize,
                modelName: "wallet",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
                timestamps: true, // deleted_at and updatedAt need this
                paranoid: true, // deleted_at need this
                createdAt: "created_at",
                updatedAt: "updated_at",
                deletedAt: "deleted_at",
            }
        );
    }
}

module.exports = Wallet;
