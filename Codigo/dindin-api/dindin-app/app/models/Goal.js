const { Model, DataTypes } = require("sequelize");

class Goal extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true,
                    notEmpty: true,
                    allowNull: false,
                },
                wallet_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: true, // ! to change
                    // ! references: {
                    // !  model: Wallet,
                    // !  key: "id"
                    // !}
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
                    allowNull: false,
                    defaultValue: "A",
                },
                expire_at: {
                    allowNull: true,
                    type: DataTypes.DATE,
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
                tableName: "goal",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
                timestamps: true, // deleted_at and updatedAt need this
                paranoid: true, // deleted_at need this
                createdAt: "created_at",
                updatedAt: "updated_at",
                deletedAt: "deleted_at", // .destroy() and .destroy(); to softdelete
                sequelize,
            }
        );
    }
}

module.exports = Goal;
