const knex = require('../database/connection');

const findByEmail = async (email) => {
  return await knex('users').where('email', email).first();
};

const findByEmailAndDifferentId = async (email, id) => {
  return await knex('users').where('email', email).andWhere('id', '!=', id).first();
};

const insert = async (nome, email, senha) => {
  return await knex('users').insert({ nome, email, senha }).returning(['id', 'nome', 'email']);
};

const update = async (id, nome, email, senha) => {
  return await knex('users').where('id', id).update({ nome, email, senha });
};

const findById = async (id) => {
  return await knex('users').select('id', 'nome', 'email').where('id', id).first();
};

module.exports = { findByEmail, findByEmailAndDifferentId, insert, findById, update };
