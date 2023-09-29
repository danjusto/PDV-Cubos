const knex = require('../database/connection');

const findAll = async () => {
    return await knex('categories');
}

module.exports = { findAll }