"use strict";

module.exports = {
    async up(queryInterface) {
        return await queryInterface.bulkInsert(
            "category",
            [
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Food",
                    type: "IN",
                    color: "EB5A46",
                    created_at: "2022-01-01 01:00:00",
                    updated_at: "2022-01-01 01:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 2,
                    description: "Bar",
                    type: "IN",
                    color: "FF9F1A",
                    created_at: "2022-02-02 02:00:00",
                    updated_at: "2022-02-02 02:00:00",
                    deleted_at: "2022-03-03 02:00:00",
                },
                {
                    wallet_id: 1,
                    user_id: 3,
                    description: "Culture",
                    type: "IN",
                    color: "0079bf",
                    created_at: "2022-03-03 03:00:00",
                    updated_at: "2022-03-03 03:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 4,
                    description: "House",
                    type: "IN",
                    color: "61bd4f",
                    created_at: "2022-04-04 04:00:00",
                    updated_at: "2022-04-04 04:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 5,
                    description: "Clothes",
                    type: "OUT",
                    color: "f2d600",
                    created_at: "2022-05-05 05:00:00",
                    updated_at: "2022-05-05 05:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Shopping",
                    type: "OUT",
                    color: "c377e0",
                    created_at: "2022-05-05 05:00:00",
                    updated_at: "2022-05-05 05:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Personal",
                    type: "OUT",
                    color: "344563",
                    created_at: "2022-01-01 01:00:00",
                    updated_at: "2022-01-01 01:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Learn",
                    type: "OUT",
                    color: "ff78cb",
                    created_at: "2022-02-02 02:00:00",
                    updated_at: "2022-02-02 02:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Health",
                    type: "OUT",
                    color: "f2d600",
                    created_at: "2022-03-03 03:00:00",
                    updated_at: "2022-03-03 03:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Vehicle",
                    type: "OUT",
                    color: "0024FF",
                    created_at: "2022-04-04 04:00:00",
                    updated_at: "2022-04-04 04:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Fun",
                    type: "OUT",
                    color: "FF9F1A",
                    created_at: "2022-05-05 05:00:00",
                    updated_at: "2022-05-05 05:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Work",
                    type: "OUT",
                    color: "61bd4f",
                    created_at: "2022-05-05 05:00:00",
                    updated_at: "2022-05-05 05:00:00",
                    deleted_at: null,
                },
                {
                    wallet_id: 1,
                    user_id: 1,
                    description: "Pet",
                    type: "IN",
                    color: "FF9F1A",
                    created_at: "2022-04-04 04:00:00",
                    updated_at: "2022-04-04 04:00:00",
                    deleted_at: null,
                },
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("category", null, {});
    },
};