const bcrypt = require('bcrypt');

module.exports = function(knex) {

  function find (id) {
    return new Promise ((resolve, reject) => {
        knex
        .select('*')
        .from('users')
        .where('id', id)
        .limit(1)
        .then((rows) => {
          var user = rows[0];
          if (user) {
            // console.log("returned user: ",user);
            return resolve(user)
          } else {
            // console.log('rejected at usr.js 18');
            return reject()
          }
        })
        .catch((error) => reject(error));
    })
  }

  function findByEmail(email) {
    return new Promise((resolve, reject) => {
      knex('users')
      .select('*')
      .where('email', email)
      .limit(1)
      .then((rows) => {
        user = rows[0]
        return resolve(user)
      })
      .catch((error) => reject(error));
    })
  }


  function checkEmailUniqueness(email) {
      return new Promise((resolve, reject) => {
        find({email: email})
        .then((user) => {
          if (user) {
            console.log('invalid email');
            return reject({
              type: 409,
              message: 'email has already been used'
            })
          }
          else {
            console.log('unique email');
            return resolve(user)
          }
        })
      })
    }
// Before this works for sure
    function authenticate(email, password) {
        return new Promise((resolve, reject) => {
          findByEmail(email)
          .then((user) => {
            if (!user) {
              console.log("rejected at user.js 64");
              return reject({
                type: 409,
                message: 'bad credentials'
              })
            }
            // Change to password_digest
            // Removed bcrypt so that I could test without making a new user
            if (password === user.password_digest)
              return resolve(user);
            // bcrypt.compare(password, user.password)
            // .then((passwordsMatch) => {
            //   if (passwordsMatch) {
            //     return resolve(user)
            //   }
            //   else {
            //     // If the passwords don't match, return a rejected promise with an
            //     // error.
            //     console.log("my password",password);
            //     return reject({
            //       type: 409,
            //       message: 'bad credentials'
            //     })
            //   }
            // })
          })
          // .catch((error) => reject(error));
        })
      }

      function add(email, password) {
        return (
          checkEmailUniqueness(email) // First check if email already exists
          .then((email) => {
            return bcrypt.hash(password, 10);
          })
          .then((passwordDigest) => {
            return knex('users').insert({
              email: email,
              password: password
            })
          })
        )
      }

      function update(id, newEmail, newPassword) {
       // We have multiple promises running here, so we'll use a slightly
       // different tecnique with Promise.all
       let promises = []

       // If the email needs to be updated, we need to check for uniqueness
       if (newEmail) {
         promises.push(checkEmailUniqueness(newEmail))
       }
       else {
         promises.push(Promise.resolve(false))
       }

       // If the password needs to be updated, we must encrypt it
       if (newPassword) {
         promises.push(bcrypt.hash(newPassword, 10))
       }
       else {
         promises.push(Promise.resolve(false))
       }

       return Promise.all(promises).then((emailAndPasswordDigest) => {
      const email = emailAndPasswordDigest[0]
      const passwordDigest = emailAndPasswordDigest[1]

      const updatedUser = {}
      if (email) updatedUser.email = email
      if (passwordDigest) updatedUser.password_digest = passwordDigest

      return knex('users')
      .update(updatedUser)
      .where({id: id})
    })
  }


  return {
    find: find,
    findByEmail: findByEmail,
    authenticate: authenticate,
    add: add,
    update: update,
    checkEmailUniqueness: checkEmailUniqueness
  }
}
