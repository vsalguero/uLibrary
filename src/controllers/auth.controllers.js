const pool = require("../postgresql");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpErrors } = require("../utils/handleErrors");

const registerController = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    const result = await pool.query(
      `select * from users where email = '${email}';`
    );
    if (result.rows.length > 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      const passwordHash = await encrypt(password);

      const dataUser = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password, role) VALUES ('${first_name}', '${last_name}', '${email}', '${passwordHash}', '${role}') 
          RETURNING id, first_name, last_name, email, role;`
      );
      console.log(dataUser);
      const data = {
        token: await tokenSign(dataUser.rows),
        user: dataUser.rows,
      };
      res.send({ data });
    }
  } catch (error) {
    handleHttpErrors(res, "ERROR_REGISTER_USER");
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      `select * from users where email = '${email}';`
    );
    if (user.rows.length < 1) {
      handleHttpErrors(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const userData = user.rows[0];
    const hashPassword = userData.password;
    const check = await compare(password, hashPassword);
    if (!check) {
      handleHttpErrors(res, "PASSWORD_INCORRECT", 401);
      return;
    }
    const data = {
      token: await tokenSign(userData),
      userData,
    };
    res.send(data);
  } catch (error) {
    handleHttpErrors(res, "ERROR_LOGIN_USER");
  }
};

/*const login = async (req, res) => {
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
  };*/

module.exports = { registerController, loginController };
