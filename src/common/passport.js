const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { JWT_SECRET_KEY } = require('./config');
const User = require('../resources/users/user.model');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('login id');
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
};
