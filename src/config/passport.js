const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../postgresql");
const helpers = require("./helpers");

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE email = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      //done(null, user, req.flash('success', 'Welcome ' + user.username));
      done(null, user);
    } else {
      done(null, false, req.flash('errors', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('errors', 'The Username does not exists.'));
  }
}));
  
  passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
  });