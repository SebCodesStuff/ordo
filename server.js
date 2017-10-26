"use strict";

require('dotenv').config();

/// For twilio maybe make this modular

const VoiceResponse = require('twilio').twiml.VoiceResponse;
const accountSid = 'AC82714f4088040acc97f9e7804e157cd4';
const authToken = '5e09260a26c7e7c22ad97f06240426ab';
const Twilio = require('twilio');
const client = new Twilio(accountSid, authToken);





const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/text", (req, res) => {
  var time = req.body.Digits;
  client.messages
  .create({
    to: '+16132659416',
    from: '+16137776522',
    body: 'Your order will be ready in '+time+ ' minutes',
  })
  .then((message) => console.log(message.sid));
});

app.post("/voice", (req,res) => {

  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    timeout: 3,
    numDigits: 2,
    action: '/text',
    method: 'POST'
  });

  gather.say('Hello restaurant, a customer had made an order. Please provide the time they can expect the order to be ready');
  console.log(twiml.toString());
  res.writeHead(200, {'Content-Type':'text/xml'});
  res.end(twiml.toString())

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
