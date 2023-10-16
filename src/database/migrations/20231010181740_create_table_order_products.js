exports.up = function (knex) {
  return knex.schema.createTable('order_products', (table) => {
    table.increments('id').primary();
    table.integer('pedido_id').notNullable().references('id').inTable('orders');
    table.integer('produto_id').notNullable().references('id').inTable('products');
    table.integer('quantidade_produto').notNullable();
    table.integer('valor_produto').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order_products');
};
