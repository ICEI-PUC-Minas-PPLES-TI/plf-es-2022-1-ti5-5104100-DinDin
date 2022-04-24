const { Model, DataTypes } = require('sequelize');

class UserHasWallet extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }

  static init(sequelize) {
    super.init({
      wallet_id: {
        field: 'id',
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        required: true,
        notEmpty: true,
        validate: {
          notEmpty: true,
        }
      },
      user_id: {
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },{
      sequelize,
      modelName: 'wallet',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      timestamps: true,
      createdAt: "created_at",
    })
  }
}

module.exports = UserHasWallet;