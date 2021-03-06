require("dotenv").config();
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

// It uses dbConfig instead of .env to work both locally and in docker and Sequelize migrations and seeds need the config/config.js file
const dbConfig = require("../config/config.js");
const Goal = require("../models/Goal.js");
const User = require("../models/User.js");
const Wallet = require("../models/Wallet.js");
const UserHasWallet = require("../models/UserHasWallet.js");
const WalletInvite = require("../models/WalletInvite");
const Category = require("../models/Category.js");
const Transaction = require("../models/Transaction.js");
const TransactionRecurrencies = require("../models/TransactionRecurrencies.js");

const dbConfigEnviroment =
    process.env.NODE_ENV === "test" ? dbConfig.test : dbConfig.production;
const sequelize = new Sequelize(
    dbConfigEnviroment.database,
    dbConfigEnviroment.username,
    dbConfigEnviroment.password,
    {
        host: dbConfigEnviroment.host,
        port: dbConfigEnviroment.port,
        logging:
            process.env.APP_DEBUG && process.env.NODE_ENV != "test"
                ? console.log
                : false,

        dialect: dbConfigEnviroment.dialect,
        dialectOptions: {
            supportBigNumbers: true,
            bigNumberStrings: true,
            connectTimeout: 60000,
            debug: false,
            dateStrings: true,
        },

        // use pooling in order to reduce db connection overload and to increase speed
        pool: {
            max: dbConfigEnviroment.pool.max,
            min: dbConfigEnviroment.pool.min,
            acquire: dbConfigEnviroment.pool.acquire,
            idle: dbConfigEnviroment.pool.idle,
        },

        define: {
            underscored: true,
            freezeTableName: true, // To not change table names in plural or model class name
            charset: "utf8mb4",
            dialectOptions: {
                collate: "utf8mb4_bin",
            },
            timestamps: false, // I don't want timestamp fields by default
        },

        // similar for sync: you can define this to always force sync for models
        sync: { alter: false },

        // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
        syncOnAssociation: true,

        timezone: "-03:00", // for writing to database

        // language is used to determine how to translate words into singular or plural
        language: "en",
    }
);

module.exports = {
    async createDatabase() {
        const connection = await mysql.createConnection({
            host: dbConfigEnviroment.host,
            port: dbConfigEnviroment.port,
            user: dbConfigEnviroment.username,
            password: dbConfigEnviroment.password,
        });
        if (process.env.NODE_ENV === "test")
            await connection.query(
                `DROP DATABASE IF EXISTS \`${dbConfigEnviroment.database}\``
            );
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS \`${dbConfigEnviroment.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`
        );
        await connection.end();
    },

    async connect() {
        try {
            // * Start Models here
            User.init(sequelize);
            Wallet.init(sequelize);
            Goal.init(sequelize);
            Category.init(sequelize);
            UserHasWallet.init(sequelize);
            WalletInvite.init(sequelize);
            TransactionRecurrencies.init(sequelize);
            Transaction.init(sequelize);

            // * Configure Associations here
            Goal.belongsTo(Wallet, {
                as: "wallet",
                foreignKey: "wallet_id",
            });
            Category.belongsTo(User, { as: "user", foreignKey: "user_id" });
            Wallet.belongsTo(User, {
                as: "owner_user",
                foreignKey: "owner_id",
            });
            Wallet.hasMany(UserHasWallet, {
                as: "users",
                foreignKey: "wallet_id",
            });
            User.hasMany(UserHasWallet, {
                as: "wallets",
                foreignKey: "user_id",
            });
            Category.belongsTo(Wallet, {
                as: "wallet",
                foreignKey: "wallet_id",
            });
            TransactionRecurrencies.belongsTo(User, {
                as: "user",
                foreignKey: "user_id",
            });
            Transaction.belongsTo(User, {
                as: "user",
                foreignKey: "user_id",
            });
            TransactionRecurrencies.belongsTo(Wallet, {
                as: "wallet",
                foreignKey: "wallet_id",
            });
            Transaction.belongsTo(Wallet, {
                as: "wallet",
                foreignKey: "wallet_id",
            });
            TransactionRecurrencies.belongsTo(Category, {
                as: "category",
                foreignKey: "category_id",
            });
            Transaction.belongsTo(Category, {
                as: "category",
                foreignKey: "category_id",
            });
            TransactionRecurrencies.hasMany(Transaction, {
                as: "transactions",
                foreignKey: "transaction_recurrencies_id",
            });
            Transaction.belongsTo(TransactionRecurrencies, {
                as: "transaction_recurrencies",
                foreignKey: "transaction_recurrencies_id",
            });

            // await sequelize.sync({ alter: false }); // force: true to drop and re-create
            await sequelize.authenticate();

            if (process.env.APP_DEBUG && process.env.NODE_ENV != "test") {
                console.log(
                    `\n--> Connection with '${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}' established. Check and re-sync all models with the database completed successfully!`
                );
            }
        } catch (error) {
            console.log(
                `\nUnable to establish, check or re-sync connection with '${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME} with user '${process.env.DB_USER}' and password '${process.env.DB_PASSWORD}.'`
            );
            console.log(error);
        }
    },

    async getCurrentDateFromDatabase() {
        return (await sequelize.query("SELECT DATE(NOW()) as current;"))[0][0]
            .current;
    },

    async close() {
        await sequelize.close();
    },

    /**
     * This method literally drop the database, use it
     * only on test enviroment
     */
    async __drop__() {
        const connection = await mysql.createConnection({
            host: dbConfigEnviroment.host,
            port: dbConfigEnviroment.port,
            user: dbConfigEnviroment.username,
            password: dbConfigEnviroment.password,
        });
        if (process.env.NODE_ENV === "test")
            await connection.query(
                `DROP DATABASE IF EXISTS \`${dbConfigEnviroment.database}\``
            );
        await connection.end();
    },
};
