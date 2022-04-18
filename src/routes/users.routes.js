const { Router } = require("express");
const { getAllUsers, getUser, createUser, deleteUser, updateUserInfo } = require('../controllers/users.controllers.js');
const { isLoggedIn } = require('../config/auth');

const router = Router();

/**
 * Get list of users
 */
router.get("/users", isLoggedIn, getAllUsers);

/**
 * Get a single user
 */
router.get("/users/:id", isLoggedIn, getUser);

/**
 * Register new book
 */
router.post("/users", isLoggedIn, createUser);

/**
 * Delete one user
 */
router.delete("/users/:id", isLoggedIn, deleteUser);

/**
 * Update one user
 */
router.put("/users/:id", isLoggedIn, updateUserInfo);

module.exports = router;