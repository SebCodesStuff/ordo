"use strict";

const express = require('express');
const router  = express.Router();
const knex = require('knex');

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
  router.get("/profile", (req, res) => {
    console.log(req.body);
    knex
      .select("*")
      .from("restaurant")
      .innerJoin("menuitem", "restaurant.id", "menuitem.restaurant_id")
      .where('restaurant_id', req.session.passport.user - 1)
      .then((results) => {
        res.render('restaurant_profile', {
          results: results
        });
      })
  });

  // Add a menu item 34
  router.post("/add-item", (req, res) => {
    var cookieID = req.session.passport.user-1;
    const menuItem = {
      restaurant_id: cookieID,
      category: req.body.category,
      item_name: req.body.name,
      item_description: req.body.description,
      price: req.body.price,
    };
    console.log(req.body);
    console.log(menuItem);
    // NEED COOKIE
    // Insert into db
    knex('menuitem')
      .insert(menuItem)
      .then((results) => {
        knex
          .select("*")
          .from("restaurant")
          .innerJoin("menuitem", "restaurant.id", "menuitem.restaurant_id")
          .where('restaurant_id', cookieID)
          .then((results) => {
            console.log(results);
            res.render('restaurant_profile', {
              results: results
            });
          })
        });

        // From Corina not sure if we need this
        // res.redirect('/profiles/' + req.session.c)

  // knex
  // .select("*")
  // .from("restaurant")
  // .then((results) => {
  //   res.render('index', {
  //     results: results
  //   });
  // res.render('restaurant_profile');
});

// PUT update menu id



  // Current open orders page
  router.get("/:id/current", (req, res) => {
    const cookieID = req.session.passport.user;

    knex.select("id")
    .from("restaurant")
    .where("user_id", cookieID)
    .then((result)=>{

      console.log(result[0].id);

      if(!result[0].id){
      res.send("your don't have authority");
      }else{

        knex.select("picture", 'name', 'phone_number', 'item_name', 'quantily', 'price')
        .from("users")
        .innerJoin("order", "users.id", "order.user_id")
        .innerJoin("lineitem", "order.id", "lineitem.order_id")
        .innerJoin("menuitem", "lineitem.item_id", "menuitem.id")
        .where("restaurant_id", result[0].id)
        .then((table)=>{

          res.render('restaurant_order', {
            table:table
          })

          console.log(table);
        })

      }

    })

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
