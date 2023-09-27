const knex = require('../database/connection');

const findByEmail = async (email) => {
    return await knex('users').where('email', email).first();
}

const insertUser = async (nome, email, senha) => {
    return await knex('users').insert({nome, email, senha}).returning(['id', 'nome', 'email']);
}

module.exports = {findByEmail, insertUser}