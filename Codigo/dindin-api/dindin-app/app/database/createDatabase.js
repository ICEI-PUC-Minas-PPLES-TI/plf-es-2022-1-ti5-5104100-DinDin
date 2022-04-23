require("dotenv").config();
const mysql = require("mysql2/promise");

const dbConfig = require("../config/config.js");
const dbConfigEnviroment =
  process.env.NODE_ENV === "test" ? dbConfig.test : dbConfig.production;

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: dbConfigEnviroment.host,
    port: dbConfigEnviroment.port,
    user: dbConfigEnviroment.username,
    password: dbConfigEnviroment.password,
  });
  if (process.env.NODE_ENV == "test")
    await connection.query(
      `DROP DATABASE IF EXISTS \`${dbConfigEnviroment.database}\``
    );
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbConfigEnviroment.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;`
  );
  await connection.end();
}

createDatabase();
