exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('descricao', 255).unique().notNullable();
    table.integer('quantidade_estoque').notNullable();
    table.integer('valor').notNullable();
    table.integer('categoria_id').notNullable().references('id').inTable('categories');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
