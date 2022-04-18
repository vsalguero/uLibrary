const { Router } = require("express");
const { getAllUsers, getUser, createUser, deleteUser, updateUserInfo, login } = require('../controllers/users.controllers.js');
const { isLoggedIn } = require('../config/auth');

const router = Router();

/**
 * Get list of users
 */
router.get("/users", getAllUsers);

/**
 * Get a single user
 */
router.get("/users/:id", getUser);

/**
 * Register new user
 */
router.post("/users", createUser);

/**
 * Delete one user
 */
router.delete("/users/:id", deleteUser);

/**
 * Update one user
 */
router.put("/users/:id", updateUserInfo);

router.post("/login", login);

module.exports = router;