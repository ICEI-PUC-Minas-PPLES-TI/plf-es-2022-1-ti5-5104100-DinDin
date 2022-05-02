"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
    async up(queryInterface) {
        return await queryInterface.bulkInsert(
            "transaction",
            [
                {
                    id: uuidv4(),
                    wallet_id: 1,
                    user_id: 1,
                    description: "Jogo da Steam",
                    value: 79.99,
                    category_id: null,
                    transaction_recurrencies_id: null,
                    created_at: "2022-01-01 01:00:00",
                    updated_at: "2022-01-01 01:00:00",
                    deleted_at: null,
                },
                {
                    id: uuidv4(),
                    wallet_id: 1,
                    user_id: 1,
                    description: "Spotify anual",
                    value: 129.9,
                    category_id: 1,
                    transaction_recurrencies_id: 1,
                    created_at: "2022-01-01 01:00:00",
                    updated_at: "2022-01-01 01:00:00",
                    deleted_at: null,
                },
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("transaction", null, {});
    },
};
