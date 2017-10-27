const bcrypt = require('bcrypt');

module.exports = function(knex) {

  function find (key, value, userType) {
    return new Promise ((resolve, reject) => {
        knex
        .select('*')
        .from(userType)
        .where(key, value)
        .limit(1)
        .then((rows) => {
          var user = rows[0];
          if (user) {
            console.log("returned user: ",user);
            return resolve(user)
          } else {
            return reject()
          }
        })
        .catch((error) => reject(error));
    })
  }

  function checkEmailUniqueness(email, userType) {
      return new Promise((resolve, reject) => {
        find('email', email, userType)
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
    function authenticate(email, password, userType) {
        return new Promise((resolve, reject) => {
          find('email',email, userType)
          .then((user) => {
            if (!user) {
              return reject({
                type: 409,
                message: 'bad credentials'
              })
            }
            bcrypt.compare(password, user.password)
            .then((passwordsMatch) => {
              if (passwordsMatch) {
                return resolve(user)
              }
              else {
                // If the passwords don't match, return a rejected promise with an
                // error.
                console.log('reject');
                return reject({
                  type: 409,
                  message: 'bad credentials'
                })
              }
            })
          })
          .catch((error) => reject(error));
        })
      }

      function add(email, password, userType) {
        return (
          checkEmailUniqueness(email, userType) // First check if email already exists
          .then((user) => {
            return bcrypt.hash(password, 10);
          })
          .then((passwordDigest) => {
            return knex(userType).insert({
              email: email,
              password: password
            })
          })
        )
      }

      function update(id, newEmail, newPassword, userType) {
       // We have multiple promises running here, so we'll use a slightly
       // different tecnique with Promise.all
       let promises = []

       // If the email needs to be updated, we need to check for uniqueness
       if (newEmail) {
         promises.push(checkEmailUniqueness(newEmail, userType))
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

       return Promise.all(promises).then((emailAndPasswordDigest, userType) => {
      const email = emailAndPasswordDigest[0]
      const passwordDigest = emailAndPasswordDigest[1]

      const updatedUser = {}
      if (email) updatedUser.email = email
      if (passwordDigest) updatedUser.password = passwordDigest

      return knex(userType)
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
