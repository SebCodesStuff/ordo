exports.seed = function(knex, Promise) {
  return knex('restaurant').del()
    .then(function () {
      return Promise.all([

        knex('restaurant').insert({address:'20 Dundas St W, Toronto, ON M5G 2C2', user_id: 2, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Our seafood buyers and inspectors carefully check for water cleanliness, seafood quality andsafety in over 20 countries`}),


        knex('restaurant').insert({address:'515 Jarvis St, Toronto, ON M4Y 2H7', user_id: 3, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Classic steak & seafood dishes are the mainstays at this stylish yet casual chain restaurant.`}),

        knex('restaurant').insert({address:'421 Dundas St W, Toronto, ON M5T 2W4', user_id: 4, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Low-key eatery with a warm vibe, serving a variety of dumplings, plus a full Chinese menu.`})

      ]);
    });
};

