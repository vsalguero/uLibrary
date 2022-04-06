const { Router } = require("express");
const { getAllBooks, getBook, createBook, deleteBook, updateBook } = require('../controllers/books.controller.js');

const router = Router();

/**
 * Get list of books
 */
router.get("/books", getAllBooks);

/**
 * Get a single book
 */
router.get("/book/:id", getBook);

/**
 * Register new book
 */
router.post("/books", createBook);

/**
 * Delete one book
 */
router.delete("/book/:id", deleteBook);

/**
 * Update one book
 */
router.put("/book/:id", updateBook);

module.exports = router;