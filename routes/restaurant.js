"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // All routes in this file will be prepended with '/restaurant/'

  // If not logged in, show the login page...
  router.get("/", (req, res) => {
    res.render('restaurant')
    // add rest name variable later
  });

  router.get("/:id", (req, res) => {
    res.render('restaurant')
  });


  return router;
}
