const knex = require('../database/connection');

const findByEmailOrCPF = async (email, cpf) => {
  return await knex('clients').where('email', email).orWhere('cpf', cpf).first();
};

const findByEmailAndDifferentId = async (email, id) => {
  return await knex('clients').where('email', email).andWhere('id', '!=', id).first();
};

const findByCpfAndDifferentId = async (cpf, id) => {
  return await knex('clients').where('cpf', cpf).andWhere('id', '!=', id).first();
};

const insert = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  return await knex('clients').insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }).returning(['id', 'nome', 'email', 'cpf', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado']);
};

const update = async (id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  return await knex('clients').where('id', id).update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });
};

const findAll = async () => {
  return await knex('clients').orderBy('id');
};

const findById = async (id) => {
  return await knex('clients').where('id', id).first();
};

module.exports = { findByEmailOrCPF, insert, findByEmailAndDifferentId, findByCpfAndDifferentId, update, findAll, findById };
