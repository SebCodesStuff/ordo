exports.seed = function(knex, Promise) {
  return knex('lineitem').del()
    .then(function () {
      return Promise.all([
        knex('lineitem').insert({order_id:1, item_id: 1, quantity:1, status:1}),
        knex('lineitem').insert({order_id:1, item_id: 2, quantity:2, status:0}),
        knex('lineitem').insert({order_id:1, item_id: 3, quantity:3, status:1}),
        knex('lineitem').insert({order_id:1, item_id: 4, quantity:4, status:0}),
        knex('lineitem').insert({order_id:1, item_id: 5, quantity:5, status:1}),
        knex('lineitem').insert({order_id:1, item_id: 6, quantity:6, status:0}),
        knex('lineitem').insert({order_id:1, item_id: 7, quantity:7, status:1}),
        knex('lineitem').insert({order_id:1, item_id: 8, quantity:8, status:0}),
        knex('lineitem').insert({order_id:1, item_id: 9, quantity:9, status:1}),
        knex('lineitem').insert({order_id:1, item_id: 10, quantity:10, status:0})
      ]);
    });
};
