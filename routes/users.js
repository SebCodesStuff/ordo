"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // ------------------ /user is prepended to the urls below ----

  router.get("/", (req, res) => {
    //check cookie , if not logged in    
    knex
      .select("*")
      .from("restaurant")
      .then((results) => {
        console.log(results)
        res.render('index', {
          results: results
          
        });
    });
    // else redirect to their user profile pg
    // res.redirect(303, '/:id')

  });


  router.get("/:id", (req, res) => {
    res.render('user_profile');
  });


  // Current open orders page
  router.get("/:id/current", (req, res) => {
    const templateVars = {
      // "current-orders" : restaurant.current
    };
    res.render('current', templateVars)
  });

// Stripe validation checkout page
  router.get("/:id/current/payment", (req, res) => {
    // only users see stripe page
    res.render("payment")
  });
  
  
  // Past orders page
  router.get("/:id/history", (req, res) => {
    const id = req.params.id;
    res.render("history")
  });


  
  
  return router;
}
