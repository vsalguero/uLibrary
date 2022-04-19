const pool = require("../postgresql");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpErrors } = require("../utils/handleErrors");

const registerController = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const result = await pool.query(`select * from users where email = '${email}';`);
    if (result.rows.length > 0) {
        return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {

        const passwordHash = await encrypt(req.body.password);
        
        const dataUser = pool.query(
          `INSERT INTO users (first_name, last_name, email, password, role) VALUES ('${first_name}', '${last_name}', '${email}', '${passwordHash}', '${role}');`);
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({ data });
    }
    } catch (error) {
        handleHttpErrors(res, "ERROR_REGISTER_USER");
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(`select * from users where email = '${email}';`);
        if (!user) {
            handleHttpErrors(res, "USER_NOT_EXISTS", 404);
            return
        }
        const hashPassword = user.password;
        const check = await compare(password, hashPassword);
        if (!check) {
            handleHttpErrors(res, "PASSWORD_INCORRECT", 401);
            return
        }
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send(data);

    } catch (error) {
        handleHttpErrors(res, "ERROR_LOGIN_USER");
    }

};

module.exports = { registerController, loginController};