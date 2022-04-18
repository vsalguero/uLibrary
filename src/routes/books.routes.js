const { Router } = require("express");
const { getAllBooks, getBook, createBook, deleteBook, updateBook } = require('../controllers/books.controller.js');
const { isLoggedIn } = require('../config/auth');

const router = Router();

/**
 * Get list of books
 */
router.get("/books", isLoggedIn, getAllBooks);

/**
 * Get a single book
 */
router.get("/books/:id", isLoggedIn, getBook);

/**
 * Register new book
 */
router.post("/books", isLoggedIn, createBook);

/**
 * Delete one book
 */
router.delete("/books/:id", isLoggedIn, deleteBook);

/**
 * Update one book
 */
router.put("/books/:id", isLoggedIn, updateBook);

module.exports = router;