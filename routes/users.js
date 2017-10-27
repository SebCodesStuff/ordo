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
    res.redirect('/');
  });


  router.get("/:userid", (req, res) => {
    console.log("successful");
    console.log(req.params.userid);
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
