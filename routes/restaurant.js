"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // ------- All routes in this file will be prepended with '/restaurant/ ----------'


  // If not logged in, show the login page...
  router.get("/", (req, res) => {
    res.render('restaurant');
    // add rest name variable later
  });

  // Restaurant login
  router.post("/login", (req, res) => {
    res.redirect('restaurant...[cookieid]');
  });

  // Restaurant profile page (to edit menu items)
  router.get("/:id", (req, res) => {
    res.render('restaurant')
  });

  // Current open orders page
  router.get("/:id/current-orders", (req, res) => {
    res.render('restaurant...[cookieid]');
  });

  // A specific current order
  router.get("/:id/current-orders/:order-id", (req, res) => {
    res.render('restaurant...[cookieid]');
  });

  // Order history page
  router.get("/:id/history", (req, res) => {
    res.render('restaurant...[cookieid]');
  });
  

  return router;
}
