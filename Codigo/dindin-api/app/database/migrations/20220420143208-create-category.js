("use strict");

const DataTypes = require("sequelize/lib/data-types");

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "category",
            {
                id: {
                    type: DataTypes.BIGINT.UNSIGNED,
                    primaryKey: true,
                    unique: true,
                    autoIncrement: true,
                    allowNull: false,
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
                user_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: {
                            tableName: "user",
                        },
                        key: "id",
                    },
                },
                description: {
                    type: DataTypes.STRING(30),
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM,
                    values: ["IN", "OUT"],
                    allowNull: false,
                },
                color: {
                    type: DataTypes.STRING(6),
                    allowNull: true,
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
        await queryInterface.dropTable("category");
    },
};
