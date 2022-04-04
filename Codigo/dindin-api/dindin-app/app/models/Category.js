'use strict';
const {
  Model, DataTypes
} = require('sequelize');
class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        color: {
          type: DataTypes.ENUM,
          values: ['BLUE', 'RED', 'GREEN', 'YELLOW', 'BLACK'],
          defaultValue: "RED",
          allowNull: false
        },
      },
      {
        tableName: "category",
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
        timestamps: true, // deleted_at and updatedAt need this
        paranoid: true, // deleted_at need this
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at", // .destroy() and .destroy(); to softdelete
        sequelize,
        defaultScope: {
          attributes: {
            exclude: [ // To not return password
            ]
          }
        },
        scopes: {
          deleted: {
            where: {
              deleted: true
            }
          },
        }
      }
    );

  }
}


module.exports = Category;