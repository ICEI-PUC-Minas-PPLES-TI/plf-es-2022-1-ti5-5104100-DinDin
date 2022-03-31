'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('goal', [{
        description: "Goal 1",
        value: "5000.5",
        status: "FINISHED",
        type: "B",
        expire_at: "2023-03-26 11:30:00",
        created_at: "2022-03-26 11:30:00",
        updated_at: "2022-03-26 11:50:00"
    },
    {
        description: "Goal 2",
        value: "6000.5",
        status: "PENDING",
        type: "A",
        expire_at: "2022-05-30 11:30:00",
        created_at: "2022-03-26 11:30:00",
        updated_at: "2022-03-26 11:50:00"
    },
    {
        description: "Goal 3",
        value: "7000.5",
        status: "LOST",
        type: "A",
        expire_at: "2022-03-26 11:30:00",
        created_at: "2022-03-26 11:30:00",
        updated_at: "2022-03-26 11:50:00"
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('goal', null, {});
  }
};
