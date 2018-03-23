require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { json } = require('body-parser');
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require('passport-auth0');

const {SESSION_SECRET, CLIENT_SECRET, CLIENT_ID, DOMAIN, CONNECTION_STRING} = process.env;

const port = 3002;

//express
const app = express();

//hooking up to the database
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log(err);
  });

//cors 
app.use(cors());

//session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100000
    }
})
);

//auth0strategy setup
app.use(passport.initialize());
app.use(passport.session());

//passport
passport.use(
    new Auth0Strategy(
    {
        domain: DOMAIN,
        clientSecret: CLIENT_SECRET,
        clientID: CLIENT_ID,
        callbackURL: "/auth"

    },
     (accessToken, refreshToken, extraParams, profile, done) => {   
         console.log('session profile: ',profile);  
      app
        .get("db")
        .getUser([profile.id])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUser([profile.id, profile.displayName])
              .then(createdUser => done(null, createdUser[0]));
          } else {
            return done(null, response[0]);
          }
        });
    }
));


//bodyparser middleware
app.use(json());

//passport
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


//setting up server to listen
app.listen(port, () => {
    console.log(`argh matey, we're all set on port ${port}`);
})