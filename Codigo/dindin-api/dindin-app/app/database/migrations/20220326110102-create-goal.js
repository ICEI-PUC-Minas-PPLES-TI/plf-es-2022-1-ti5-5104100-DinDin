const DataTypes = require("sequelize/lib/data-types");

("use strict");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "goal",
            {
                id: {
                    type: DataTypes.INTEGER(11).UNSIGNED,
                    primaryKey: true,
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
                    defaultValue: "PENDING",
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM,
                    values: ["A", "B"],
                    defaultValue: "A",
                    allowNull: false,
                },
                expire_at: {
                    allowNull: true,
                    type: DataTypes.DATE,
                },
                wallet_id: {
                    type: DataTypes.INTEGER(11).UNSIGNED,
                    allowNull: true, //trocar depois
                    // references: {
                    //   model: Wallet,
                    //   key: "id"
                    // }
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
                    allowNull: true,
                    type: DataTypes.DATE,
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
