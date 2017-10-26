exports.seed = function(knex, Promise) {
  return knex('restaurant').del()
    .then(function () {
      return Promise.all([
        knex('restaurant').insert({name:'Red Lobster', address:'20 Dundas St W, Toronto, ON M5G 2C2', phone_number: '+16134566789', schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', picture: 'restaurant1.jpeg',description:`Our seafood buyers and inspectors carefully check for water cleanliness, seafood quality andsafety in over 20 countries`}),

        knex('restaurant').insert({name:'The Keg Mansion', address:'515 Jarvis St, Toronto, ON M4Y 2H7', phone_number: '+1416964-6609', schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', picture: 'restaurant2.jpeg',description:`Classic steak & seafood dishes are the mainstays at this stylish yet casual chain restaurant.`}),

        knex('restaurant').insert({name:'Dim Sum King', address:'421 Dundas St W, Toronto, ON M5T 2W4', phone_number: '+416551-3366', schedule: 'Mon. to Sun. 11AM-10PM',type: 'fast food', picture: 'restaurant3.jpeg',description:`Low-key eatery with a warm vibe, serving a variety of dumplings, plus a full Chinese menu.`})
      ]);
    });
};

