// const bcrypt = require('bcrypt');
//
// module.exports = function(knex) {
//
//   function find(id, type) {
//     return new Promise ((resolve, reject) => {
//         knex
//         .select('*')
//         .where(5)
//         .from('users')
//         .limit(1)
//         .then((rows) => {
//           user = rows[0];
//           if (user) {
//             return resolve(user)
//           } else {
//             return reject()
//           }
//         })
//         .catch((error) => reject(error));
//     })
//   }
//
//
//
//
// }
