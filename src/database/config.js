const { Pool } = require('pg');
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const pool = new Pool({
    host,
    user,
    password,
    database
})

module.exports = pool;