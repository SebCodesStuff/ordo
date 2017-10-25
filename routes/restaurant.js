"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // All routes in this file will be prepended with '/restaurant/'

  router.get("/", (req, res) => {
    res.render('restaurant')
  });

  return router;
}
