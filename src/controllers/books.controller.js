const pool = require('../postgresql');

const getAllBooks = async (req, res) => {
    try {
        const result = await pool.query("select * from books");
        res.json(result.rows[0]);
    } catch (err) {
        //next(err);
    }
}

const getBook = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const result = await pool.query(`select * from books where id = ${id}`);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        //next(err);
    }
}

const createBook = async (req, res) => {
    const { title, author, publish_year, genre } = req.body;
    try {
        const result = await pool.query(`INSERT INTO books (title, author, publish_year, genre) values ('${title}', '${author}', '${publish_year}', '${genre}')`);
        res.json(result.rows[0]);
    } catch (err) {
        //next(err);
    }
}

const deleteBook = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(`delete from books where id = ${id}`);
        console.log(result.rowCount);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Not found"
            });
        }
        return res.sendStatus(204);

    } catch (err) {
        //next(err);
    }
}

const updateBook = async (req, res) => {
    const id = req.params.id;
    const { title, author, publish_year, genre } = req.body;
    try {
        const result = await pool.query(
            `update books set title = '${title}', author = '${author}', publish_year = '${publish_year}', genre = '${genre}' where id = ${id} returning *`);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Not found"
            });
        }
        return res.json(result.rows[0]);

    } catch (err) {
        //next(err);
    }
}

module.exports = { getAllBooks, getBook, createBook, deleteBook, updateBook };