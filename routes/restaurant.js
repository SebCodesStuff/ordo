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
    const templateVars = {
      // "restaurant-name" : restaurant.name
    };
    res.render('restaurant_profile', templateVars)
  });

  // Current open orders page
  router.get("/:id/current-orders", (req, res) => {
    const templateVars = {
      // "current-orders" : restaurant.current
    };
    res.render('restaurant_current', templateVars)
  });

  // A specific current order
  router.get("/:id/current-orders/:orderId", (req, res) => {
    const templateVars = {
      // "current-orders" : restaurant.current
    };
    res.render('restaurant_order', templateVars)
  });

  // Order history page
  router.get("/:id/history", (req, res) => {
    const templateVars = {
      // "current-orders" : restaurant.current
      "name": req.params.id
    };
    res.render('restaurant_history', templateVars)
  });
  

  return router;
}
