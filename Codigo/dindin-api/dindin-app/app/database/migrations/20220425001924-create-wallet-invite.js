const DataTypes = require("sequelize/lib/data-types");

("use strict");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("wallet_invite", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT.UNSIGNED,
            },
            user_id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                references: { model: "user", key: "id" },
            },
            wallet_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                references: { model: "wallet", key: "id" },
            },
            code: {
                type: DataTypes.STRING(8),
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            expire_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("wallet_invite");
    },
};
