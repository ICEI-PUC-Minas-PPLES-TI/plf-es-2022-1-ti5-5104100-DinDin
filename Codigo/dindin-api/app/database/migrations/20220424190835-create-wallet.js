("use strict");

const DataTypes = require("sequelize/lib/data-types");

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "wallet",
            {
                id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    primaryKey: true,
                    unique: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING(30),
                    allowNull: false,
                },
                shared: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                owner_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: { model: "user", key: "id" },
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
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
        await queryInterface.dropTable("wallet");
    },
};
