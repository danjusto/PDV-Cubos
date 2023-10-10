exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('cliente_id').notNullable().references('id').inTable('clients');
    table.string('observacao', 255);
    table.integer('valor_total').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
