exports.seed = function(knex, Promise) {
  return knex('restaurant').del()
    .then(function () {
      return Promise.all([
        knex('restaurant').insert({name:'Red Lobster', address:'1234 Fitch Ave. Toronto, ON M2M 7Z1', phone_number: '+16134566789', schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', picture: 'restaurant1.jpeg'})
      ]);
    });
};
