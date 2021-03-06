"use strict";

module.exports = {
    async up(queryInterface) {
        const users = await queryInterface.sequelize.query(
            `SELECT id from user ORDER BY created_at DESC LIMIT 1;`
        );

        const data = [
            {
                description: "Personal",
                shared: false,
                owner_id: users[0][0].id,
                created_at: "2022-03-24 11:30:00",
                updated_at: "2023-03-26 11:30:00",
            },
            {
                description: "Family Travels",
                shared: true,
                owner_id: users[0][0].id,
                created_at: "2022-03-23 11:30:00",
                updated_at: "2023-04-05 11:30:00",
            },
        ];

        await queryInterface.bulkInsert("wallet", data, {});

        const wallets = await queryInterface.sequelize.query(
            `SELECT id from wallet ORDER BY created_at DESC LIMIT ${data.length};`
        );

        let walletUsers = [];
        let walletInvite = [];
        for (let i = 0; i < data.length; i++) {
            walletUsers.push({
                wallet_id: wallets[0][i].id,
                user_id: users[0][0].id,
                created_at: "2022-03-23 11:30:00",
            });

            walletInvite.push({
                wallet_id: wallets[0][i].id,
                user_id: users[0][0].id,
                created_at: "2022-03-23 11:30:00",
                expire_at: "2022-03-24 11:30:00",
                code: (wallets[0][i].id + "12345678").substring(0, 8),
            });
        }

        try {
            walletUsers.push({
                wallet_id: 1,
                user_id: 1,
                created_at: "2022-03-23 11:30:00",
            });
        } catch (e) {
            console.log(e);
        }

        await queryInterface.bulkInsert("user_has_wallet", walletUsers, {});
        await queryInterface.bulkInsert("wallet_invite", walletInvite, {});
    },

    async down(queryInterface) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("wallet", null, {});
        await queryInterface.bulkDelete("user_has_wallet", null, {});
        await queryInterface.bulkDelete("wallet_invite", null, {});
    },
};
