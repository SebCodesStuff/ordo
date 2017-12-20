"use strict";

const express = require('express');
const router  = express.Router();
const knex = require('knex');

module.exports = (knex, passport) => {

  const dataHelper = require('../db/user/userData')(knex);

  // ----------- /user is prepended to the urls below ----

  router.get("/", (req, res) => {
    var cookieID = req.session.passport.user;
    console.log(cookieID);

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
             results: results,
             status: "customer"
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
              console.log("my rest results",results);
               res.render('restaurant_profile', {
                 results: results,
                 status: "restaurant"
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


          res.render("login");

        }).catch((e) => {
          res.status(400);

        });

      console.log(newUser);

    }else{
      res.send("password not match");
    }

  });


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

        knex.select("order.id","address", "item_name", "price", "restaurant.name", "quantity", "status")
        .from("users")
        .innerJoin("order", "users.id", "order.user_id")
        .innerJoin("lineitem", "order.id", "lineitem.order_id")
        .innerJoin("menuitem", "lineitem.item_id", "menuitem.id")
        .innerJoin("restaurant", "menuitem.restaurant_id", "restaurant.id")
        .where({"users.id": cookieID, "status": 0})

        .then((table)=>{

          res.render('user_current', {
            table: table
          })
            console.log(table);

        })

      }
  });

// STRIPES

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);
router.get("/:id/current/payment", (req, res) =>
{

return res.render("payment", {keyPublishable})
});

router.get('/charge', (req, res) => {
  res.render('charge');
});

router.post("/charge", (req, res) => {
  let amount = 1500;


  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Ordo Charge",
        currency: "cad",
        customer: customer.id
    }))
  .then(charge => res.render("charge"));
});



  // Past orders page
  router.get("/:id/history", (req, res) => {
    const cookieID = req.session.passport.user;

    console.log(cookieID);

      if(!cookieID){
      res.send("your don't have authority");
      }else{

        knex.select("order.id","address", "item_name", "price", "restaurant.name", "quantity", "status")
        .from("users")
        .innerJoin("order", "users.id", "order.user_id")
        .innerJoin("lineitem", "order.id", "lineitem.order_id")
        .innerJoin("menuitem", "lineitem.item_id", "menuitem.id")
        .innerJoin("restaurant", "menuitem.restaurant_id", "restaurant.id")
        .where({"users.id": cookieID, "status": 1})

        .then((table)=>{

          res.render('user_history', {
            table: table
          })
            console.log(table);

        })

      }

  });


    router.get("/:id/menu", (req, res) => {
      // var cookieID = req.session.passport.user;
      knex('order')
      // .insert({user_id: cookieID, submit_time: '1990-10-26'})
      .then((results) => {
        knex('users')
        .innerJoin("restaurant", "users.id", "restaurant.user_id")
        .innerJoin("menuitem", "restaurant.id","menuitem.restaurant_id")
        .innerJoin("lineitem", "menuitem.id", "lineitem.item_id")
        .innerJoin("order", "lineitem.order_id", "order.id")
        .select('*')
        .where('restaurant_id',req.params.id)
        .then((results) => {
          console.log(results);
          res.render('restaurant_menu', {
            results : results
          })
        });
      });
    })


  return router;
}
