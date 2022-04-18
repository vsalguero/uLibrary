const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');


const passport = require("passport");


router.post('/login', 
  //muestra mensajes de express-validator
  check('username').notEmpty().withMessage('Username is Required'),  
  check('password').notEmpty().withMessage('Password is Required'), 
  (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {      
    //return res.status(422).json({ errors: errors.array() });
    console.log('errors', errors);
    res.redirect('/');
  }
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
