const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require("dotenv").config();
const { db } = require("./config/firebase.js");

// routes
const mainRoutes = require("./routes/main");

app.use(cors({ credentials: true, origin:process.env.ORIGIN }));

console.log("origin",process.env.ORIGIN)

app.use(express.json());
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use(passport.initialize());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("access token index",accessToken)
      const { id,email,first_name, last_name } = profile._json;
      const userData = {
        id,
        // email,
        firstName: first_name,
        lastName: last_name
      };
          const loginRef = db.collection("loginInfo").doc(id);
          const addUser = loginRef.set(
            {
              userData: userData,
            },
            { merge: true }
          )
      done(null, {accessToken});
    }
  )
);








// Setup Routes
app.use("/", mainRoutes);
 

app.listen(8000, () => {
  console.log("Server has started");
});
