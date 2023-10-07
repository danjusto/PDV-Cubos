exports.up = function (knex) {
  return knex.schema.createTable('clients', (table) => {
    table.increments('id').primary();
    table.string('nome', 100).notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('cpf', 15).unique().notNullable();
    table.string('cep', 10);
    table.string('rua', 255);
    table.string('numero', 50);
    table.string('bairro', 100);
    table.string('cidade', 50);
    table.string('estado', 50);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('clients');
};
