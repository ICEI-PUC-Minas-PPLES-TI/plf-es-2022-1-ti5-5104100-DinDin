"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert("goal", [
            {
                description: "Goal 1",
                value: "16000",
                status: "FINISHED",
                type: "A",
                expire_at: "2022-09-26 11:50:00",
                wallet_id: 1,
                created_at: "2022-03-26 11:30:00",
                updated_at: "2022-05-30 11:30:00",
            },
            {
                description: "Goal 2",
                value: "20000.55",
                status: "LOST",
                type: "A",
                expire_at: "2022-07-20 11:50:00",
                wallet_id: 1,
                created_at: "2022-03-24 11:30:00",
                updated_at: "2023-03-26 11:30:00",
            },
            {
                description: "Goal 3",
                value: "50000.55",
                status: "PENDING",
                type: "A",
                expire_at: "2022-02-20 11:50:00",
                wallet_id: 1,
                created_at: "2022-01-24 11:30:00",
                updated_at: "2023-03-26 11:30:00",
            },
            {
                description: "Goal 4",
                value: "5000.5",
                status: "FINISHED",
                type: "B",
                expire_at: "2022-04-26 11:50:00",
                wallet_id: 1,
                created_at: "2022-03-24 11:30:00",
                updated_at: "2023-03-26 11:30:00",
            },
            {
                description: "Goal 5",
                value: "7000.5",
                status: "LOST",
                type: "B",
                expire_at: "2022-05-26 11:50:00",
                wallet_id: 1,
                created_at: "2022-03-24 11:30:00",
                updated_at: "2023-03-26 11:30:00",
            },
            {
                description: "Goal 6",
                value: "9000.5",
                status: "PENDING",
                type: "B",
                expire_at: "2022-06-20 11:50:00",
                wallet_id: 1,
                created_at: "2022-03-24 11:30:00",
                updated_at: "2023-03-26 11:30:00",
            },
            {
                description: "Goal 7",
                value: "50000.55",
                status: "FINISHED",
                type: "A",
                expire_at: "2022-06-20 11:50:00",
                wallet_id: 1,
                created_at: "2022-03-24 11:30:00",
                updated_at: "2023-03-26 11:30:00",
                deleted_at: "2023-03-26 11:30:00",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("goal", null, {});
    },
};
