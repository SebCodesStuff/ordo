"use strict";

const express = require('express');
const router  = express.Router();
// const passport = require('./../server.')

module.exports = (knex, passport) => {

  // ----------- /user is prepended to the urls below ----

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

// STRIPES

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);
router.get("/:id/current/payment", (req, res) =>
{ 

return res.render("payment", {keyPublishable})
});


router.post("/charge", (req, res) => {
  let amount = 500;

  
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
        currency: "cad",
        customer: customer.id
    }))
  .then(charge => res.render("charge"));
});

  

  // Past orders page
  router.get("/:id/history", (req, res) => {
    const id = req.params.id;
    res.render("history")
  });
  
  
  return router;
}
