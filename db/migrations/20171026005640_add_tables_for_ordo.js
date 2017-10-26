
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('order', function (table) {
        table.increments();
        table.integer('user_id')
        table.string('submit_time');
      }),

      knex.schema.createTable('lineitem', function (table) {
        table.increments();
        table.integer('order_id')
        table.integer('item_id')
        table.integer('quantily');
      }),

      knex.schema.createTable('menuitem', function (table) {
        table.increments();
        table.integer('restaurant_id')
        table.string('category');
        table.string('item_name');
        table.string('decription');
        table.float('price');
      }),

      knex.schema.createTable('restaurant', function (table) {
        table.increments();
        table.string('name');
        table.string('address');
        table.string('phone_number');
        table.string('schedule');
        table.string('type');
        table.string('picture');
      }),

      knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('picture');
        table.string('first_name');
        table.string('last_name');
        table.string('phone_number');
      })



  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([

    knex.schema.dropTable('order'),

    knex.schema.dropTable('lineItem'),
    knex.schema.dropTable('menuItem'),
    knex.schema.dropTable('restaurant'),
    knex.schema.dropTable('users')

    ])

};
