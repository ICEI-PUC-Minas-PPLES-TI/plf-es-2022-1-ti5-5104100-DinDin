const DataTypes = require("sequelize/lib/data-types");

("use strict");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "wallet",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.BIGINT.UNSIGNED,
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
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                updated_at: {
                    allowNull: false,
                    type: DataTypes.DATE,
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
