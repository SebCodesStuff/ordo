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
  router.get("/restaurant/profile", (req, res) => {
    // knex
    //   .select("*")
    //   .from("restaurant")
    //   .innerJoin("menuitems", "restaurant.id", "menu.items.restaurant_id")


    res.render('restaurant_profile')
  });

  // Add a menu item 34
  router.post("/add-item", (req, res) => {
    var cookieID = req.session.passport.user;
    const menuItem = {
      restaurant_id: cookieID,
      category: req.body.category,
      item_name: req.body.name,
      decription: req.body.description,
      price: req.body.price,
    };
    console.log(req.body);
    console.log(menuItem);
    // NEED COOKIE
    // Insert into db
    knex('menuitem')
      .insert(menuItem)
      .then(menuitems => {
        // menuItem = menuitems[0];
        res.render('restaurant_profile');
        // res.redirect('/profiles/' + req.session.c)
      })
  // knex
  // .select("*")
  // .from("restaurant")
  // .then((results) => {
  //   res.render('index', {
  //     results: results
  //   });
  res.render('restaurant_profile');
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
