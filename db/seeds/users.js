exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({picture:'user1.jpg', first_name: 'Alice', last_name:'Bruce', phone_number:'+13066124024', email:'haha@gmail.com', password:'000000'})
      ]);
    });
};
