("use strict");

const DataTypes = require("sequelize/lib/data-types");

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "wallet_invite",
            {
                id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: { model: "user", key: "id" },
                },
                wallet_id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: false,
                    references: { model: "wallet", key: "id" },
                },
                code: {
                    type: DataTypes.STRING(8),
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                expire_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                engine: "InnoDB", // default: 'InnoDB'
                charset: "utf8mb4", // default: null
                collate: "utf8mb4_bin", // default: null
            }
        );
    },
    async down(queryInterface) {
        await queryInterface.dropTable("wallet_invite");
    },
};
