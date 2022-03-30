'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const bcryptPassword = bcrypt.hashSync("user-demo-password", 8);
    return await queryInterface.bulkInsert('user', [
      {
        name: "Demo User 01",
        email: "demo-user-01@email.com",
        password: bcryptPassword,
        created_at: "2022-01-01 01:00:00",
        updated_at: "2022-01-01 01:00:00"
      },
      {
        name: "Demo User 02",
        email: "demo-user-02@email.com",
        password: bcryptPassword,
        created_at: "2022-02-02 02:00:00",
        updated_at: "2022-02-02 02:00:00"
      },
      {
        name: "Demo User 03",
        email: "demo-user-03@email.com",
        password: bcryptPassword,
        created_at: "2022-03-03 03:00:00",
        updated_at: "2022-03-03 03:00:00"
      },
      {
        name: "Demo User 04",
        email: "demo-user-04@email.com",
        password: bcryptPassword,
        created_at: "2022-04-04 04:00:00",
        updated_at: "2022-04-04 04:00:00"
      },
      {
        name: "Demo User 05",
        email: "demo-user-05@email.com",
        password: bcryptPassword,
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
