("use strict");

const DataTypes = require("sequelize/lib/data-types");

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "wallet",
            {
                id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
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
                initial_value: {
                    type: DataTypes.DOUBLE,
                    defaultValue: 0,
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
