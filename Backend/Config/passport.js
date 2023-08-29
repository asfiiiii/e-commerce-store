const passport = require("passport");
const User = require("../Models/UserModel");
require("dotenv").config;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZmFyIiwicGFzc3dvcmQiOiIkMmEkMTAkRkhsSGIxQ0cxa0lRVHAyVFNkTlVxT3p3MWJsY3BtN01yQWRTYkgxSjlad21HTDlGSUhPZ1ciLCJlbWFpbCI6ImFzZmFybWEyODE1QGdtYWlsLmNvbSIsImlhdCI6MTY5MzMzNzYyMywiZXhwIjoxNjkzNDI0MDIzfQ.ZcUsape0rAIEyF4S0icoZQO4fNv9OZA_7XDCQlaGI_4";
  return token;
};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_PASSWORD;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findOne({ username: jwt_payload.username });
    if (!user) {
      return done(err, false);
    }
    done(null, user);
  })
);
