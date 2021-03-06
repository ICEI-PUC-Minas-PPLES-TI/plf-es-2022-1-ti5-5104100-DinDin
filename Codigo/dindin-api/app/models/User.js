const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    field: "id",
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    required: true,
                    notEmpty: true,
                },
                name: {
                    field: "name",
                    type: DataTypes.STRING(100),
                    notEmpty: true,
                    allowNull: false,
                },
                email: {
                    field: "email",
                    type: DataTypes.STRING(150),
                    unique: true,
                    allowNull: false,
                    notEmpty: true,
                    validate: {
                        isEmail: true,
                    },
                },
                password: {
                    field: "password",
                    type: DataTypes.STRING(64),
                    notEmpty: true,
                    allowNull: true,
                    comment: "Encrypted with 64 digits",
                },
                firebaseId: {
                    field: "firebase_id",
                    type: DataTypes.STRING(128),
                    notEmpty: true,
                    unique: true,
                    allowNull: true,
                },
                hasPassword: {
                    type: DataTypes.VIRTUAL(DataTypes.BOOLEAN),
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
                tableName: "user",
                charset: "utf8mb4",
                collate: "utf8mb4_bin",
                timestamps: true, // deleted_at and updatedAt need this
                paranoid: true, // deleted_at need this
                createdAt: "created_at",
                updatedAt: "updated_at",
                deletedAt: "deleted_at", // .destroy() and .destroy(); to softdelete
                sequelize,
                defaultScope: {
                    attributes: {
                        exclude: [
                            "password", // To not return password
                        ],
                    },
                },
                scopes: {
                    withPassword: {
                        attributes: { include: ["password"] },
                    },
                    deleted: {
                        where: {
                            deleted: true,
                        },
                    },
                },
            }
        );
    }
}

User.prototype.verifyUserHasPassword = async function () {
    const password = (await User.scope("withPassword").findByPk(this.id))
        .password;

    if (password) {
        return true;
    } else {
        return false;
    }
};

module.exports = User;
