"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


// ------- All routes in this file will be prepended with /user -------

  router.get("/:userid", (req, res) => {


  });



  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //     User.findOne({ username: username }, function (err, user) {
  //       if (err) { return done(err); }
  //       if (!user) { return done(null, false); }
  //       if (!user.verifyPassword(password)) { return done(null, false); }
  //       return done(null, user);
  //     });
  //   }
  // ));

  router.post("/user-login", (req, res) => {
    console.log("post route successful");
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password);

    // passport.authenticate('local', { failureRedirect: '/login' }),
    // function(req, res) {

    //   console.log(email, password);
     res.redirect('/');
    });






  // User's order history
  router.get("/history", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });

  });

  return router;
}
