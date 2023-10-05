const knex = require('../database/connection');

const findByEmail = async (email) => {
  return await knex('clients')
    .where('email', email)
    .first();
};

const findByEmailOrCPF = async (email, cpf) => {
  return await knex('clients')
    .where('email', email)
    .orWhere('cpf', cpf)
    .first();
};

const insertClient = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  return await knex('clients')
    .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .returning(['id', 'nome', 'email', 'cpf', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado']);
};

const updateClient = async (id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  return await knex('clients')
    .where('id', id)
    .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .returning(['id', 'nome', 'email', 'cpf', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado']);
};


module.exports = {
  findByEmail,
  insertClient,
  findByEmailOrCPF,
  updateClient
 };
