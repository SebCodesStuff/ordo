exports.seed = function(knex, Promise) {
  return knex('order').del()
    .then(function () {
      return Promise.all([
        knex('order').insert({user_id:1, submit_time: '1990-10-26'})
      ]);
    });
};
