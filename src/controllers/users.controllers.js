const pool = require("../postgresql");
const jwt = require("jsonwebtoken");
const helpers = require("../config/helpers");
const bcryptjs = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("select * from users");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await pool.query(`select * from users where id = ${id}`);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(`select * from users where email = '${email}';`);
    if (result.rows.length > 0) {
    const user = result.rows[0];
  
    const validPassword = await bcryptjs.compare(password, user.password);
    if (validPassword) {
      res.send({
        token: 'success'
      });
    } else {
      res.send({
        token: 'Incorrect password'
      });
    }
  } else {
    res.send({
      token: 'The username not exists'
    });
  }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while Login!" + err, //Database connection error
    });
  }
};


const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`delete from users where id = ${id}`);
    console.log(result.rowCount);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, role } = req.body;
  try {
    const result = await pool.query(
      `update users set first_name = '${first_name}', last_name = '${last_name}', role = '${role}' where id = ${id} returning *`
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};



module.exports = { getAllUsers, getUser, deleteUser, updateUserInfo, login };
