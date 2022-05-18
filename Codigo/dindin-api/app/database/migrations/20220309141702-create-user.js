("use strict");

const DataTypes = require("sequelize/lib/data-types");

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "user",
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    primaryKey: true,
                    unique: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                firebase_id: {
                    type: DataTypes.STRING(128),
                    allowNull: true,
                    unique: true,
                },
                name: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(150),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                    comment: "Encrypted with 64 digits",
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
        await queryInterface.dropTable("user");
    },
};
