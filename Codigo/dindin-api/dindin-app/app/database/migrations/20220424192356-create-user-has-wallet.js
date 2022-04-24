const DataTypes = require('sequelize/lib/data-types');

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_has_wallet', {
      user_id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: { model: 'user', key: 'id' }
      },
      wallet_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: { model: 'wallet', key: 'id' }
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_has_wallet');
  }
};