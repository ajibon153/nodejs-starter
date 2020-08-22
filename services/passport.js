const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

// ======= Mongoo model instance =========
passport.serializeUser((user, done) => {
  //fungsi yang telah terdaftarkan dari done(null, user) di User.findOne
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
// =========================================

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOne({ googleId: profile.id }).then((existUser) => {
        if (existUser) {
          // jika ID user sudah ada, maka jangan simpan
          // console.log("ID User sudah ada");
          done(null, existUser);
        } else {
          // jika ID user belum ada, maka simpan
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
