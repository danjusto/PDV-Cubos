const knex = require('../database/connection');

const findByEmail = async (email) => {
  return await knex('clients')
    .where('email', email)
    .first();
};

const findByEmailAndDifferentCPF = async (email, cpf) => {
  return await knex('clients')
    .where('email', email)
    .andWhere('cpf', '!=', cpf)
    .first();
};

const insertClient = async (nome, email, cpf) => {
  return await knex('clients')
    .insert({ nome, email, cpf })
    .returning(['id', 'nome', 'email', 'cpf']);
};



module.exports = {
  findByEmail,
  insertClient,
  findByEmailAndDifferentCPF
 };
