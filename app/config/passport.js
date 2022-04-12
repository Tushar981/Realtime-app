/*const LocalStrategy = newrequire('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        // Login
        // check if email exists
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'No user with this email' });
        }

        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: 'Logged in succesfully' });
            }
            return done(null, false, { message: 'Wrong username or password' });
          })
          .catch((err) => {
            return done(null, false, { message: 'Something went wrong' });
          });
      }
    )
  );

  // with the help of  serializeUser we can check that user is logged in or not
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
*/

const LocalStrategy = require('passport-local').Strategy; // we capitalise for the class name
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        // Login
        // check if email exists
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'No user with this email' });
        }

        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: 'Logged in succesfully' }); //it refer to the three parameter that is avilable inside authController -> postLogin()
            }
            return done(null, false, { message: 'Wrong username or password' });
          })
          .catch((err) => {
            return done(null, false, { message: 'Something went wrong' });
          });
      }
    )
  );

  // after successfull login user._id stored
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
