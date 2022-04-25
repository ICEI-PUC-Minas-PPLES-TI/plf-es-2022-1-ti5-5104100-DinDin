const DataTypes = require("sequelize/lib/data-types");
("use strict");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(
            "category",
            {
                id: {
                    type: DataTypes.INTEGER(11).UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                wallet_id: {
                    type: DataTypes.BIGINT(11).UNSIGNED,
                    allowNull: true, //! to change
                    // references: {
                    //   model: Wallet,
                    //   key: "id"
                    // }
                },
                user_id: {
                    type: DataTypes.INTEGER(11).UNSIGNED,
                    allowNull: true, //! to change
                    // references: {
                    //   model: User,
                    //   key: "id"
                    // }
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
        await queryInterface.dropTable("category");
    },
};
