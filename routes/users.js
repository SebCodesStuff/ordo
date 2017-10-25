"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

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