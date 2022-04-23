'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('category', [
      {
        description:"Food",
        type:"IN",
        color: "000000",
        created_at: "2022-01-01 01:00:00",
        updated_at: "2022-01-01 01:00:00"
      },
      {
        description:"Bar",
        type:"IN",
        color: "FF0000",
        created_at: "2022-02-02 02:00:00",
        updated_at: "2022-02-02 02:00:00"
      },
      {
        description:"Culture",
        type:"IN",
        color: "50FF00",
        created_at: "2022-03-03 03:00:00",
        updated_at: "2022-03-03 03:00:00"
      },
      {
        description:"House",
        type:"IN",
        color: "FCFF00",
        created_at: "2022-04-04 04:00:00",
        updated_at: "2022-04-04 04:00:00"
      },
      {
        description:"Clothes",
        type:"IN",
        color: "FCFF00",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      {
        description:"Shopping",
        type:"IN",
        color: "FCFF00",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      {
        description:"Personal",
        type:"IN",
        color: "0024FF",
        created_at: "2022-01-01 01:00:00",
        updated_at: "2022-01-01 01:00:00"
      },
      {
        description:"Learn",
        type:"IN",
        color: "000000",
        created_at: "2022-02-02 02:00:00",
        updated_at: "2022-02-02 02:00:00"
      },
      {
        description:"Health",
        type:"IN",
        color: "000000",
        created_at: "2022-03-03 03:00:00",
        updated_at: "2022-03-03 03:00:00"
      },
      {
        description:"Vehicle",
        type:"IN",
        color: "0024FF",
        created_at: "2022-04-04 04:00:00",
        updated_at: "2022-04-04 04:00:00"
      },
      {
        description:"Fun",
        type:"IN",
        color: "000000",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      {
        description:"Work",
        type:"IN",
        color: "FCFF00",
        created_at: "2022-05-05 05:00:00",
        updated_at: "2022-05-05 05:00:00"
      },
      {
        description:"Pet",
        type:"IN",
        color: "0024FF",
        created_at: "2022-04-04 04:00:00",
        updated_at: "2022-04-04 04:00:00"
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {});
  }
};