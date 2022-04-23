'use strict';

const DataTypes = require('sequelize/lib/data-types');

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('user', 'firebase_id', {
      type: DataTypes.STRING(128),
      allowNull: true,
      unique: true,
    });
    console.log('batata')
    queryInterface.changeColumn('user', 'password', {
      allowNull: true,
      type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('user', 'firebase_id');
    queryInterface.changeColumn('user', 'password', {
      allowNull: false,
      type: DataTypes.STRING
    });
  }
};
