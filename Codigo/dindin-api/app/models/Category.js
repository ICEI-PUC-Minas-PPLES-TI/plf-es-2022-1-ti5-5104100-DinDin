const { Model, DataTypes } = require("sequelize");
const User = require("./User");
// const Wallet = require("./Wallet");

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                },
                wallet_id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: true, // ! to change
                    /*references: {
                      model: Wallet,
                      key: "id"
                    }*/
                },
                user_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false, //! to change
                    references: {
                        model: User,
                        key: "id",
                    },
                },
                description: {
                    type: DataTypes.STRING(30),
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM,
                    values: ["IN", "OUT"],
                    allowNull: false,
                },
                color: {
                    type: DataTypes.STRING(6),
                    allowNull: true,
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
                tableName: "category",
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
module.exports = Category;
