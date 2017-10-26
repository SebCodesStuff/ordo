exports.seed = function(knex, Promise) {
  return knex('lineitem').del()
    .then(function () {
      return Promise.all([
        knex('lineitem').insert({order_id:1, item_id: 1, quantily:3})
      ]);
    });
};
