'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('user', [{
      name: "demo-user-01",
      email: "demo-user-01@email.com",
      password: "demo-user-01-senha",
      created_at: "2022-01-01 01:00:00",
      updated_at: "2022-01-01 01:00:00"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
