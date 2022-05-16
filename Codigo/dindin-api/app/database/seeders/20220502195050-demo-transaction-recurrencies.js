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
                    day: 5,
                    interval: "M",
                    category_id: 1,
                    expired_at: null,
                    created_at: "2022-05-07 20:00:00",
                    updated_at: "2022-05-07 20:00:00",
                    deleted_at: null,
                }, // No expire, not deleted
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Almoço",
                    value: 15.0,
                    day: 5,
                    interval: "D",
                    category_id: 1,
                    expired_at: "2050-05-06 20:01:00",
                    created_at: "2022-05-07 20:00:00",
                    updated_at: "2022-05-07 20:00:00",
                    deleted_at: null,
                }, // Not expired, not deleted
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Prime Video",
                    value: 10.0,
                    day: 5,
                    interval: "M",
                    category_id: 1,
                    expired_at: null,
                    created_at: "2022-05-07 20:00:00",
                    updated_at: "2022-05-07 20:00:00",
                    deleted_at: "2022-05-07 20:00:00",
                }, // No expire, deleted
                {
                    wallet_id: 1,
                    user_id: 2,
                    description: "Lanche",
                    value: 5.99,
                    day: 5,
                    interval: "D",
                    category_id: null,
                    expired_at: "2022-05-07 20:01:00",
                    created_at: "2022-05-07 20:00:00",
                    updated_at: "2022-05-07 20:00:00",
                    deleted_at: null,
                }, // Expired, not deleted
                {
                    wallet_id: 1,
                    user_id: 2,
                    description: "HBOMax",
                    value: 35.0,
                    day: 5,
                    interval: "M",
                    category_id: null,
                    expired_at: "2022-06-06 20:01:00",
                    created_at: "2022-05-07 20:00:00",
                    updated_at: "2022-05-07 20:00:00",
                    deleted_at: "2022-05-07 20:00:00",
                }, // Expired, deleted
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("transaction-recurrencies", null, {});
    },
};
