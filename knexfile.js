// Update with your config settings.
const { resolve } = require('path');
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: resolve(__dirname, "src", "database", "seeds")
    }
  }
};
