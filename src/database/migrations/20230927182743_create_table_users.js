exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('nome', 100).notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('senha', 255).notNullable();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
