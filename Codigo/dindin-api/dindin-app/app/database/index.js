require("dotenv").config();
const { Sequelize } = require("sequelize");

// It uses dbConfig instead of .env to work both locally and in docker and Sequelize migrations and seeds need the config/config.js file
const dbConfig = require("../config/config.js");

const User = require("../models/User.js");

const sequelize = new Sequelize(dbConfig.production.database, dbConfig.production.username, dbConfig.production.password, {
  host: dbConfig.production.host,
  port: dbConfig.production.port,
  logging: process.env.APP_DEBUG ? console.log : false,

  dialect: dbConfig.production.dialect,
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
    connectTimeout: 60000,
    debug: false
  },

  // use pooling in order to reduce db connection overload and to increase speed
  pool: {
    max: dbConfig.production.pool.max,
    min: dbConfig.production.pool.min,
    acquire: dbConfig.production.pool.acquire,
    idle: dbConfig.production.pool.idle
  },

  define: {
    underscored: true,
    freezeTableName: true,
    syncOnAssociation: true,
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_bin'
    },
    timestamps: true
  },

  // similar for sync: you can define this to always force sync for models
  sync: { force: true },

  // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
  syncOnAssociation: true,

  // language is used to determine how to translate words into singular or plural
  language: 'en',
});

module.exports = {

  async connect() {
    try {
        await sequelize.sync({ alter: true }); // force: true to drop and re-create

      // Start Models here
      User.init(sequelize);

      // Configure Associations here


      if (process.env.APP_DEBUG) {
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

  async close() {
    await sequelize.close();
  }
};
