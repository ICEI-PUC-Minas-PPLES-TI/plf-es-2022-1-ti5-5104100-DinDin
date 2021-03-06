const { Model, DataTypes } = require("sequelize");
const User = require("./User");

class Wallet extends Model {
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
                owner_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: false,
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
