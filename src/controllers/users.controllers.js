const pool = require("../postgresql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helpers = require("../config/helpers");

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

const createUser = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email='${email}';`); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {

      const salt = await bcrypt.genSalt(10);
      
      bcrypt.hash(password, salt, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          first_name,
          last_name,
          email,
          password: hash,
          role,
        };
        var flag = 1; //Declaring a flag

        //Inserting data into the database

        pool.query(
          `INSERT INTO users (first_name, last_name, email, password, role) VALUES ('${first_name}', '${last_name}', '${email}', '${user.password}', '${role}');`,
          (err) => {
            if (err) {
              flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              flag = 1;
              res
                .status(200)
                .send({ message: "User added to database, not verified" });
            }
          }
        );
        if (flag) {
          const token = jwt.sign(
            //Signing a jwt token
            {
              email: user.email,
            },
            process.env.JWT_KEY
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(`select * from users where email = '${email}';`);
    if (result.rows.length > 0) {
    const user = result.rows[0];
  
    const validPassword = await bcrypt.compare(password, user.password);
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



module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUserInfo, login };
