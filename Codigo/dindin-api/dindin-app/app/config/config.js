require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

let logging = false;
if(process.env.APP_DEBUG)
  logging=console.log;

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    underscored: true,
    freezeTableName: true,
    logging: logging,
    dialect: 'mysql',
    charset: "utf8mb4",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    createdBy: "created_by",
    updatedBy: "updated_by",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    underscored: true,
    freezeTableName: true,
    logging: logging,
    dialect: 'mysql',
    charset: "utf8mb4",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    createdBy: "created_by",
    updatedBy: "updated_by",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    underscored: true,
    freezeTableName: true,
    logging: logging,
    dialect: 'mysql',
    charset: "utf8mb4",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    createdBy: "created_by",
    updatedBy: "updated_by",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Directory for commands: ./dindin-api/dindin-app

// Create migration: npx sequelize-cli model:generate --name user --attributes name:string  --config config.json

// Create seed: npx sequelize-cli seed:generate --name demo-user-01
// Run all seeds: npx sequelize-cli db:seed:all --env 'development'
