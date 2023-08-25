const passport = require("passport");
const User = require("../Models/UserModel");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findOne({ username: jwt_payload.username });
    if (!user) {
      return done(err, false);
    }
    done(null, user);
  })
);
