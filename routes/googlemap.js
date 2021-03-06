"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("address")
      .from("restaurant")
      .orderBy("user_id")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
