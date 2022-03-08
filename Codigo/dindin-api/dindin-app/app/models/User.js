const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          field: 'id',
          type: DataTypes.INTEGER.UNSIGNED,
          required: true,
          primaryKey: true,
          autoIncrement: true,
          notEmpty: true,
          allowNull: false
        },
        name: {
          field: 'name',
          type: DataTypes.STRING(100),
          notEmpty: true,
          allowNull: false
        },
        email: {
          field: 'email',
          type: DataTypes.STRING(150),
          notEmpty: true,
          allowNull: false,
          validate: {
            isEmail: true
          },
          unique: {
            args: 'email',
            msg: 'Email address already in use!'
          }
        },
        password: {
          field: 'password',
          type: DataTypes.STRING(64),
          notEmpty: true,
          allowNull: false,
          comment: 'Encrypted with 64 digits'
        }
      },
      {
        tableName: "user",
        timestamps: true, // deletedAt and updatedAt need this
        paranoid: true, // deletedAt need this
        createdAt: true,
        updatedAt: true,
        deletedAt: true, // .destroy() and .destroy(); to softdelete
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
          activeUsers: {
            include: [
              { model: User, where: { active: true } }
            ]
          },
        }
      }
    );
  }
}

module.exports = User;
