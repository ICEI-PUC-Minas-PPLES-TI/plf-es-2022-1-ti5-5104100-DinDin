const { Model, DataTypes } = require("sequelize");

class Goal extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(30),
          allowNull: false
        },
        value: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          unique: true
        },
        status: {
          type: DataTypes.ENUM,
          values: ["FINISHED", "LOST", "PENDING"],
          defaultValue: "PENDING",
          allowNull: false
        },
        type: {
          type: DataTypes.ENUM,
          values: ["A", "B"],
          defaultValue: "A",
          allowNull: false
        },
        expire_at: {
          allowNull: true,
          type: DataTypes.DATE
        },
        wallet_id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: true//trocar depois
          // references: {
          //   model: Wallet,
          //   key: "id"
          // }
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        deleted_at: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: null,
        }

      },
      {
        tableName: "goal",
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
        timestamps: true, // deleted_at and updatedAt need this
        paranoid: true, // deleted_at need this
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at", // .destroy() and .destroy(); to softdelete
        sequelize
      }
    );
  }
}

module.exports = Goal;
