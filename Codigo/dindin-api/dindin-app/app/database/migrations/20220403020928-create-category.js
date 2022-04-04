const DataTypes = require("sequelize/lib/data-types");

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category',
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
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deleted_at: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: null,
        },
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        charset: 'utf8mb4', // default: null
        collate: 'utf8mb4_bin' // default: null
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('category');
  }
};
