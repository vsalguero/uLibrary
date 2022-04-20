const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/auth.controllers.js");

/**
 * Register url
 */
router.post("/register", registerController);

router.post("/login", loginController);

router.get('/logout', function(req, res, next) {
  // remove the req.user property and clear the login session
  req.logout();
  // destroy session data
  req.session = null;
  // redirect to homepage
  res.redirect('/');
});

module.exports = router;
