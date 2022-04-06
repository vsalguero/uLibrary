const pool = require('../postgresql');

const getAllBooks = async (req, res) => {
    const result = await pool.query('select now()');
    res.send("Books");
    console.log(result);

}

const getBook = (req, res) => {
    res.send("Book");
}

const createBook = (req, res) => {
    res.send("Save a book");
}

const deleteBook = (req, res) => {
    res.send("Delete one book");
}

const updateBook = (req, res) => {
    res.send("Update one book");
}

module.exports = { getAllBooks, getBook, createBook, deleteBook, updateBook };