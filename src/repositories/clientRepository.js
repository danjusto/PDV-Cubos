const knex = require('../database/connection');

const findByEmailOrCPF = async (email, cpf) => {
  return await knex('clients')
    .where('email', email)
    .orWhere('cpf', cpf)
    .first();
};

const getClientById = async (id) => {
  return await knex('clients')
  .where('id', id)
  .first();
};

const findByEmailAndDifferentId = async (email, id) => {
  return await knex('clients')
    .where('email', email)
    .andWhere('id', '!=', id)
    .first();
};

const findByCpfAndDifferentId = async (cpf, id) => {
  return await knex('clients')
    .where('cpf', cpf)
    .andWhere('id', '!=', id)
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
  findByEmailOrCPF,
  insertClient,
  getClientById,
  findByEmailAndDifferentId,
  findByCpfAndDifferentId,
  updateClient
 };
