"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // ------------------ /user/:userID is prepended to the urls below ----

  router.get("/", (req, res) => {
    //check cookie 
    res.render('user_profile')
    //if restaurant, 
    // res.render('restaurant_profile')

  });

  // Add a menu item 34
  router.post("/add-item", (req, res) => {
    const menuItem = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      // category: 
    };
    console.log(req.body);
    // NEED COOKIE
    // Insert into db
    knex('menuitem')
      .insert(menuItem, '*')
      .then(menuitems => {
        menuItem = menuitems[0];
        res.redirect('/:id')
      })
  // knex
  // .select("*")
  // .from("restaurant")
  // .then((results) => {
  //   res.render('index', {
  //     results: results
  //   });
    res.sendStatus(303).redirect("/:id");
  });

  // User login form on the homepage
  // router.post("/login", (req, res) => {
  //
  //   res.redirect('/');
  // });
  // User login form on the homepage
  router.post("/register", (req, res) => {
    res.redirect('/');
  });


  router.get("/:userid", (req, res) => {
    console.log("successful");
    console.log(req.params.userid);
    res.redirect('/');
  });



  // User's order history
  router.get("/history", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });

  // Past orders page
  router.get("/history", (req, res) => {
    const id = req.params.id;
    res.render("history")
  });

  // Stripe validation checkout page
  router.get("/payment", (req, res) => {
    // only users see stripe page
    res.render("payment")
  });
  
  
  return router;
}
