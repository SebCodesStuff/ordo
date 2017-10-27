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
// const passport    = require('passport')

// Seperated Routes for each Resource
const userRoutes = require("./routes/users");
const restRoutes = require("./routes/restaurant");



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles/styles",
  dest: __dirname + "/public/styles",
  indentedSyntax : true,
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));
app.use(require("cookie-parser")());
app.use(require("express-session")({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


// Mount routes
app.use("/user", userRoutes(knex));
app.use("/restaurant", restRoutes(knex));


// Home page
app.get("/", (req, res) => {
  // const cookie = cookie
  knex
    .select("*")
    .from("restaurant")
    .then((results) => {
      console.log(results)
      res.render('index', {
        results: results
        
      });
  });

});

// User login form on the homepage
app.post("/register", (req, res) => {
  // if restaurant, ejs show link to their resto pg
  // use cookie to get their name to greet them 
  res.redirect('/');
});

// Twilio Routes


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

// For user login



const flash = require('connect-flash');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/user/userData')(knex);

app.use(flash());

passport.use(
  new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    (email, password, done) => {
      User.authenticate(email, password)
      .then((user) => done(null, user))
      .catch((error) => done(null, false, error))
    }
  )
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.find(id)
  .then((user) => done(null, user))
  .catch((error) => done(err, null))
})

// Use passport middleware
app.use(passport.initialize())
app.use(passport.session())



app.post('/user/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/none',

  })
);


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
})
