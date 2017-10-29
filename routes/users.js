"use strict";

const express = require('express');
const router  = express.Router();
const knex = require('knex');

module.exports = (knex, passport) => {

  const dataHelper = require('../db/user/userData')(knex);

  // ----------- /user is prepended to the urls below ----

  router.get("/", (req, res) => {
    var cookieID = req.session.passport.user;

// Finds the user
      knex('users')
      .select('type')
      .where('id', cookieID)
      .then((result)=>{
// Checks if they're a restaurant or customer
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
           knex
             .select("*")
             .from("restaurant")
             .innerJoin("menuitem", "restaurant.id", "menuitem.restaurant_id")
             .where('restaurant_id', results[0].id)
             .then((results) => {
               console.log(results);
               res.render('restaurant_profile', {
                 results: results
               });
             })
         });
       }
      })





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

    const cookieID = req.session.passport.user;

    console.log(cookieID);

      if(!cookieID){
      res.send("your don't have authority");
      }else{

        knex.select("order.id","address", "item_name", "price", "restaurant.name", "quantity")
        .from("users")
        .innerJoin("order", "users.id", "order.user_id")
        .innerJoin("lineitem", "order.id", "lineitem.order_id")
        .innerJoin("menuitem", "lineitem.item_id", "menuitem.id")
        .innerJoin("restaurant", "menuitem.restaurant_id", "restaurant.id")
        .where("users.id", cookieID)

        .then((table)=>{

          res.render('current', {
            table: table
          })
            console.log(table);

        })

      }
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
