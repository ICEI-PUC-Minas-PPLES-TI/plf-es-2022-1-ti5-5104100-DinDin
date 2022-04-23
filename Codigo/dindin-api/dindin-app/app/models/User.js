const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          field: 'id',
          type: DataTypes.INTEGER(11).UNSIGNED,
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
          allowNull: false,
          validate: {
            notEmpty: true,
          }
        },
        email: {
          field: 'email',
          type: DataTypes.STRING(150),
          notEmpty: true,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
            isEmail: true
          }
        },
        password: {
          field: 'password',
          type: DataTypes.STRING(64),
          notEmpty: true,
          allowNull: true,
          validate: {
            notEmpty: true,
          },
          comment: 'Encrypted with 64 digits'
        },
        firebaseId: {
          field: 'firebase_id',
          type: DataTypes.STRING(128),
          notEmpty: true,
          unique: true,
          allowNull: true,
          validate: {
            notEmpty: true,
          }
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
