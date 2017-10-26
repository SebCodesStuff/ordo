"use strict";

const express = require('express');
const router  = express.Router();

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
    console.log("successful");
    console.log(req.params.userid);
    res.redirect('/');
  });


// The failure redirects to the same page so use another way to handle auth errors

  // router.post('/login',
  //   passport.authenticate('local', {
  //     successRedirect: '/',
  //     failureRedirect: '/restaurant',
  //   })
  // );



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
