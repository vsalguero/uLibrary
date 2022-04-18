const express = require("express");
const router = express.Router();


const passport = require("passport");


router.post('/login', 
  (req, res, next) => {
  passport.authenticate('local.login', {
    successRedirect: '/books/list',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});
  
  router.get('/logout', (req, res) => {
    //cierra la sesión
    req.logOut();
    res.redirect('/');
  });


module.exports = router;
