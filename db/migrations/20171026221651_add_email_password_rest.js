
exports.up = function(knex, Promise) {
  return Promise.all([

      knex.schema.table('restaurant', function (table) {
        table.string('email');
      }),

      knex.schema.table('restaurant', function (table) {
        table.string('password');
      })

  ])

};

exports.down = function(knex, Promise) {

  return Promise.all([

      knex.schema.table('restaurant', function (table) {

        table.dropColumn('email')
      }),

      knex.schema.table('restaurant', function (table) {

        table.dropColumn('password')
      })
  ])

};
