
exports.up = function(knex, Promise) {
  return Promise.all([

      knex.schema.table('restaurant', function (table) {
        table.string('description');
      }),

      knex.schema.table('users', function (table) {
        table.string('email');
      })



  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('restaurant', function (table) {

        table.dropColumn('description')
      }),

      knex.schema.table('users', function (table) {

        table.dropColumn('email')
      })
  ])

};
