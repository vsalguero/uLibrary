const express = require("express");
const router = express.Router();


const passport = require("passport");


  
  router.get('/logout', (req, res) => {
    //cierra la sesión
    req.logOut();
    res.redirect('/');
  });


module.exports = router;
