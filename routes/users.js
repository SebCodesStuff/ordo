"use strict";

const express = require('express');
const router  = express.Router();
const knex = require('knex');

module.exports = (knex, passport) => {


// user type found with
// result[0].type;

  // ----------- /user is prepended to the urls below ----

  router.get("/", (req, res) => {
    var cookieID = req.session.passport.user;
    console.log(cookieID);
      knex('users')
      .select('type')
      .where('id', cookieID)
      .then((result)=>{
       if (result[0].type === 'customer') {
         knex
         .select("*")
         .from("users")
         .innerJoin("restaurant", "users.id", "restaurant.user_id")
         .orderBy("user_id")
         .then((results) => {
           res.render('index', {
             results: results
           });
         });
       } else {
         knex("users")
         .select("*")
         .innerJoin("restaurant", "users.id", "restaurant.user_id")
         .where('user_id', cookieID)
         .then((results) => {
           res.render('restaurant_profile', {
             results: results
           });
         });
       }
      })





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
