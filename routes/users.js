"use strict";

const express = require('express');
const router  = express.Router();
// const passport = require('./../server.')

module.exports = (knex, passport) => {

  const dataHelper = require('../db/user/userData')(knex);

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

  router.post("/register", (req, res) => {

    console.log(req.body.password, req.body.confirm_password);

    if(req.body.password === req.body.confirm_password){

      const newUser = {
      // picture:'user1.jpg',
      name: req.body.name,
      phone_number: `+1${req.body.phone_number}`,
      email: req.body.email,
      password: req.body.password
      // type:'customer'
      };

      dataHelper.add(newUser)
        .then(() => {


          res.send(200);

        }).catch((e) => {
          res.status(400);

        });

      console.log(newUser);

    }else{
      res.send("password not match");
    }

  });


  // router.get("/register", (req, res) => {
  //   res.status(200);
  // });








  // router.get("/:id", (req, res) => {
  //   res.render('user_profile');
  // });


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
