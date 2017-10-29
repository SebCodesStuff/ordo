exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({picture:'user1.jpg', name: 'Alice Bruce', phone_number:'+13066124024', email:'haha@gmail.com', password_digest:'000000', type:'customer'}),
        knex('users').insert({picture:'restaurant1.jpg', name: 'Red Lobster', phone_number:'+16134566789', email:'RedLobster@gmail.com', password_digest:'000001', type:'restaurant'}),
        knex('users').insert({picture:'restaurant2.jpg', name: 'The Keg Mansion', phone_number:'+14169646609', email:'KegMansion@gmail.com', password_digest:'000002', type:'restaurant'}),
        knex('users').insert({picture:'restaurant3.jpg', name: 'Dim Sum King', phone_number:'+4165513366', email:'DimSum@gmail.com', password_digest:'000003', type:'restaurant'})
      ]);
    });
};



