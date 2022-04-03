'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('category', [
      {
        name: "Food",
        color: "BLUE",
        created_at: "2022-01-01 01:00:00",
        updated_at: "2022-01-01 01:00:00"
      },
      {
        name: "Bar",
        color: "RED",
        created_at: "2022-02-02 02:00:00",
        updated_at: "2022-02-02 02:00:00"
      },
      {
        name: "Culture",
        color: "BLACK",
        created_at: "2022-03-03 03:00:00",
        updated_at: "2022-03-03 03:00:00"
      },
      {
        name: "House",
        color: "BLACK",
        created_at: "2022-04-04 04:00:00",
        updated_at: "2022-04-04 04:00:00"
      },
      {
        name: "Clothes",
        color: "BLACK",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      {
        name: "Shopping",
        color: "Green",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      {
        name: "Personal",
        color: "BLUE",
        created_at: "2022-01-01 01:00:00",
        updated_at: "2022-01-01 01:00:00"
      },
      {
        name: "Learn",
        color: "RED",
        created_at: "2022-02-02 02:00:00",
        updated_at: "2022-02-02 02:00:00"
      },
      {
        name: "Health",
        color: "BLACK",
        created_at: "2022-03-03 03:00:00",
        updated_at: "2022-03-03 03:00:00"
      },
      {
        name: "Vehicle",
        color: "RED",
        created_at: "2022-04-04 04:00:00",
        updated_at: "2022-04-04 04:00:00"
      },
      {
        name: "Fun",
        color: "BLACK",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      {
        name: "Work",
        color: "Green",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      
      {
        name: "Pet",
        color: "BLUE",
        created_at: "2022-04-04 04:00:00",
        updated_at: "2022-04-04 04:00:00"
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {});
  }
};
