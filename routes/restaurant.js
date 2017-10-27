"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


// ------- All routes in this file will be prepended with /restaurant -------


  // If not logged in, show the login page...
  router.get("/", (req, res) => {
    res.render('restaurant');
    // add rest name variable later
    // if logged in,
    //res.redirect(303, "/:id")
  });


  // Restaurant profile page (to see and edit menu items)
  router.get("/:id", (req, res) => {
    // knex
    //   .select("*")
    //   .from("restaurant")
    //   .join("menuitems")

    res.render('restaurant_profile')
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
  res.redirect(303, "/:id");
});

// PUT update menu id



  // Current open orders page
  router.get("/:id/current", (req, res) => {
    const templateVars = {
      // "current-orders" : restaurant.current
    };
    res.render('current', templateVars)
  });


  // Order history page
  router.get("/:id/history", (req, res) => {
    const templateVars = {
      // "current-orders" : restaurant.current
      "name": req.params.id
    };
    res.render('history', templateVars)
  });


  return router;
}
