"use strict";

const express = require('express');
const router  = express.Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


module.exports = (knex) => {


// ------- All routes in this file will be prepended with /user -------

  // User login form on the homepage
  // router.post("/login", (req, res) => {
  //
  //   res.redirect('/');
  // });
  // User login form on the homepage
  router.post("/register", (req, res) => {
    res.send(200).redirect('/');
  });


  router.get("/:userid", (req, res) => {
    console.log("made it to userid");

  });


  // router.post("/login", (req, res) => {
  //   console.log("post route successful");
  //   var email = req.body.email;
  //   var password = req.body.password;
  //   console.log(email, password);
  //    res.redirect('users/');
  //   });
  //
  //
  router.post('/user-login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );



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
