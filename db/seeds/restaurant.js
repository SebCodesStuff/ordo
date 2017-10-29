exports.seed = function(knex, Promise) {
  return knex('restaurant').del()
    .then(function () {
      return Promise.all([

        knex('restaurant').insert({address:'20 Dundas St W, Toronto, ON M5G 2C2', user_id: 2, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Our seafood buyers and inspectors carefully check for water cleanliness, seafood quality andsafety in over 20 countries`, name: 'Red Lobster'}),
        knex('restaurant').insert({address:'515 Jarvis St, Toronto, ON M4Y 2H7', user_id: 3, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Classic steak & seafood dishes are the mainstays at this stylish yet casual chain restaurant.`, name: 'The Keg Mansion'}),
        knex('restaurant').insert({address:'421 Dundas St W, Toronto, ON M5T 2W4', user_id: 4, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Low-key eatery with a warm vibe, serving a variety of dumplings, plus a full Chinese menu.`, name: 'Dim Sum King'}),
        knex('restaurant').insert({address:'307 Wellesley St E, Toronto, ON M4X 1P8', user_id: 5, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Long-time (since 1990) casual stop for South Indian & Sri Lankan fare, with vegetarian options.`, name: 'Rashnaa Restaurant'}),
        knex('restaurant').insert({address:'417 Bloor St W, Toronto, ON M5S 1X6', user_id: 6, schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', description:`Bright shop where guests create their own frozen treats from a variety of flavours & toppings.`, name: 'YoYo Yogurt Cafe'})


      ]);
    });
};
