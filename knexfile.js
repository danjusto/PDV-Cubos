// Update with your config settings.
const { resolve } = require('path');
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    },
    migrations: {
      directory: resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: resolve(__dirname, "src", "database", "seeds")
    }
  }
};
