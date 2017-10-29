exports.seed = function(knex, Promise) {
  return knex('menuitem').del()
    .then(function () {
      return Promise.all([
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup1', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup2', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup3', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup4', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup5', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup6', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup7', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup8', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup9', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup10', item_description:'some seefood in soup', price:'10.40'})

      ]);
    });
};
