const { Router } = require("express");

const router = Router();

/**
 * Get list of books
 */
router.get("/books", (req, res) => {
    res.send("Books");
});

/**
 * Get a single book
 */
router.get("/book/:id", (req, res) => {
    res.send("Book");
});

/**
 * Register new book
 */
router.post("/books", (req, res) => {
    res.send("Save a book");
});

/**
 * Delete one book
 */
router.delete("/book/:id", (req, res) => {
    res.send("Delete one book");
});

/**
 * Update one book
 */
router.put("/book/:id", (req, res) => {
    res.send("Update one book");
});

module.exports = router;