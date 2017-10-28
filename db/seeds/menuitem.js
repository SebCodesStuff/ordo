exports.seed = function(knex, Promise) {
  return knex('menuitem').del()
    .then(function () {
      return Promise.all([
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup', item_description:'some seefood in soup', price:'10.40'})
      ]);
    });
};
