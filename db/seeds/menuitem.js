exports.seed = function(knex, Promise) {
  return knex('menuitem').del()
    .then(function () {
      return Promise.all([

        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'seefood soup', item_description:'some seefood in soup', price:'10.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'Garlic Grilled Shrimp', item_description:'Shrip in garlic', price:'6.00'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'Admirals Feast', item_description:'some seefood in soup', price:'12.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'Dessert', item_name:'Cake', item_description:'some seefood in soup', price:'11.50'}),
        knex('menuitem').insert({restaurant_id:1, category: 'Drinks', item_name:'Ice Tea', item_description:'some seefood in soup', price:'16.00'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'Seaside Shimp Trio', item_description:'some seefood in soup', price:'17.80'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'Snow Crab Legs', item_description:'some seefood in soup', price:'19.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'Seaport lobster and shrimp', item_description:'some seefood in soup', price:'34.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'Live maritime Lobster', item_description:'some seefood in soup', price:'19.40'}),
        knex('menuitem').insert({restaurant_id:1, category: 'main dish', item_name:'Rock Lobster Tail', item_description:'some seefood in soup', price:'13.40'})

      ]);
    });
};
