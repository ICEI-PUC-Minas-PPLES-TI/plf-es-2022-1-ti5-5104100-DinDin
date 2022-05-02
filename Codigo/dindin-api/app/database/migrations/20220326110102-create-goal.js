("use strict");

const DataTypes = require("sequelize/lib/data-types");

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "goal",
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
                value: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM,
                    values: ["FINISHED", "LOST", "PENDING"],
                    allowNull: false,
                    defaultValue: "PENDING",
                },
                type: {
                    type: DataTypes.ENUM,
                    values: ["A", "B"],
                    allowNull: false,
                    defaultValue: "A",
                },
                expire_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                wallet_id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    allowNull: true, // ! trocar
                    // ! references: {
                    // !     model: {
                    // !         tableName: "wallet",
                    // !     },
                    // !     key: "id",
                    // ! },
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
        await queryInterface.dropTable("goal");
    },
};
