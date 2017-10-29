exports.seed = function(knex, Promise) {
  return knex('menuitem').del()
    .then(function () {
      return Promise.all([
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:2, category: 'main dish', item_name:'baseball Steak', item_description:'A thick steak', price:'20.00'}),
        knex('menuitem').insert({restaurant_id:3, category: 'snack', item_name:'Lotus rice', item_description:'Rice with beef in the centre', price:'3.99'})
      ]);
    });
};
