"use strict";

module.exports = {
    async up(queryInterface) {
        return await queryInterface.bulkInsert(
            "transaction_recurrencies",
            [
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Spotify",
                    value: 19.99,
                    day: 6,
                    interval: 12,
                    category_id: 1,
                    created_at: "2022-02-02 02:00:00",
                    updated_at: "2022-02-02 02:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Spotify",
                    value: 19.99,
                    day: 6,
                    interval: 12,
                    category_id: 1,
                    created_at: "2022-02-02 02:00:00",
                    updated_at: "2022-02-02 02:00:00",
                    deleted_at: "2022-02-02 02:00:00",
                },
                {
                    wallet_id: 1,
                    user_id: 2,
                    description: "Spotify",
                    value: 19.99,
                    day: 2,
                    interval: 10,
                    category_id: null,
                    created_at: "2022-02-02 02:00:00",
                    updated_at: "2022-02-02 02:00:00",
                    deleted_at: null,
                },
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("transaction-recurrencies", null, {});
    },
};
