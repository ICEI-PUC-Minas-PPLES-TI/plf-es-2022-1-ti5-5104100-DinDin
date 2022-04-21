const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          field: 'id',
          type: DataTypes.INTEGER(11).UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          required: true,
          notEmpty: true,
          validate: {
            notEmpty: true,
          }
        },
        name: {
          field: 'name',
          type: DataTypes.STRING(100),
          notEmpty: true,
          allowNull: false,
          notEmpty: true,
          validate: {
            notEmpty: true,
          }
        },
        email: {
          field: 'email',
          type: DataTypes.STRING(150),
          unique: true,
          allowNull: false,
          notEmpty: true,
          validate: {
            notEmpty: true,
            isEmail: true
          }
        },
        password: {
          field: 'password',
          type: DataTypes.STRING(64),
          allowNull: false,
          notEmpty: true,
          validate: {
            notEmpty: true,
          },
          comment: 'Encrypted with 64 digits'
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
        }
      },
      {
        tableName: "user",
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
            exclude: [
              "password" // To not return password
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

module.exports = User;
