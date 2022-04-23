const DataTypes = require("sequelize/lib/data-types");
("use strict");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "category",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        wallet_id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: true, //to change
          // references: {
          //   model: Wallet,
          //   key: "id"
          // }
        },
        user_id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: true, //to change
          // references: {
          //   model: user,
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
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        deleted_at: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: null,
        },
      },
      {
        engine: "InnoDB", // default: 'InnoDB'
        charset: "utf8mb4", // default: null
        collate: "utf8mb4_bin", // default: null
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("category");
  },
};
