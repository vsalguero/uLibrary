const { Router } = require("express");
const { getAllBooks, getBook, createBook, deleteBook, updateBook } = require('../controllers/books.controller.js');
const { isLoggedIn } = require('../config/auth');

const router = Router();

/**
 * Get list of books
 */
router.get("/books", getAllBooks);

/**
 * Get a single book
 */
router.get("/books/:id", getBook);

/**
 * Register new book
 */
router.post("/books", createBook);

/**
 * Delete one book
 */
router.delete("/books/:id", deleteBook);

/**
 * Update one book
 */
router.put("/books/:id", updateBook);

module.exports = router;