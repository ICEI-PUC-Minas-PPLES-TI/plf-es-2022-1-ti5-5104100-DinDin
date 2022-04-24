'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [{
      description: 'Personal',
      shared: false,
      initial_value: 500.45,
      created_at: "2022-03-24 11:30:00",
      updated_at: "2023-03-26 11:30:00",
    },{
      description: 'Family Travels',
      shared: true,
      initial_value: 200.45,
      created_at: "2022-03-23 11:30:00",
      updated_at: "2023-04-05 11:30:00",
    }]

    await queryInterface.bulkInsert('wallet', data , {});

    const wallets = await queryInterface.sequelize.query(
      `SELECT id from wallet ORDER BY created_at DESC LIMIT ${data.length};`
    );

    const users = await queryInterface.sequelize.query(
      `SELECT id from user ORDER BY created_at DESC LIMIT 1;`
    );

    let walletUsers = []
    for(let i=0; i<data.length;i++) {
      walletUsers.push({
        wallet_id: wallets[0][i].id,
        user_id: users[0][0].id,
        created_at: "2022-03-23 11:30:00"
      })
    }

    await queryInterface.bulkInsert('user_has_wallet', walletUsers , {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('wallet', null, {});
  }
};
