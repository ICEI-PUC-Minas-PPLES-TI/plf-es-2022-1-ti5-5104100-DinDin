"use strict";
const { Model, DataTypes } = require("sequelize");
class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          required:true,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          notEmpty:true,
        },
        wallet_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true, //! to change
          // references: {
          //   model: Wallet,
          //   key: "id"
          // }
        },
        user_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true, //! to change
          // references: {
          //   model: User,
          //   key: "id"
          // }
        },
        description: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM,
          values: ["IN", "OUT"],
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING(6),
          allowNull: false,
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
        defaultScope: {
          attributes: {
            exclude: [
              // To not return password
            ],
          },
        },
        scopes: {
          deleted: {
            where: {
              deleted: true,
            },
          },
        },
      }
    );
  }
}

module.exports = Category;
