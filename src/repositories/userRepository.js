const knex = require('../database/connection');

const findByEmail = async (email) => {
  return await knex('users').where('email', email).first();
};

const findByEmailAndDifferentId = async (email, id) => {
  return await knex('users')
    .where('email', email)
    .andWhere('id', '!=', id)
    .first();
};

const insertUser = async (nome, email, senha) => {
  return await knex('users')
    .insert({ nome, email, senha })
    .returning(['id', 'nome', 'email']);
};

const updateUser = async (id, nome, email, senha) => {
  return await knex('users')
    .where('id', id)
    .update({ nome, email, senha })
    .returning(['id', 'nome', 'email']);
};

const getUserById = async (id) => {
  return await knex('users').where('id', id).select('id', 'nome', 'email');
};

module.exports = {
  findByEmail,
  findByEmailAndDifferentId,
  insertUser,
  getUserById,
  updateUser,
};
