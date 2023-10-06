const knex = require('../database/connection');

const insertProduct = async (descricao, quantidade_estoque, valor, categoria_id) => {
  return await knex('products')
    .insert({ descricao, quantidade_estoque, valor, categoria_id })
    .returning(['descricao', 'quantidade_estoque', 'valor', 'categoria_id']);
};

module.exports = { insertProduct }