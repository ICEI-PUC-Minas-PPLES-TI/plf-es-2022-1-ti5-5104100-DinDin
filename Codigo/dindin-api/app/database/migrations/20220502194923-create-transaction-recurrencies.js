("use strict");

const DataTypes = require("sequelize/lib/data-types");

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("transaction_recurrencies", {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,

                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false,
            },
            wallet_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: {
                        tableName: "wallet",
                    },
                    key: "id",
                },
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
            value: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            day: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
            },
            interval: {
                type: DataTypes.ENUM,
                values: ["D", "W", "B", "M", "S", "A"],
                allowNull: false,
                comment:
                    "D == daily, W == weekly, B == biweekly, M == monthly, S == semi-annual, A == annual",
            },
            category_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: {
                        tableName: "category",
                    },
                    key: "id",
                },
            },
            expired_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
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
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("transaction_recurrencies");
    },
};
