//package dotenv for use environment variables from .env file
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');

//import routes
const bookRoutes = require("./routes/books.routes");
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");



const app = express();

require('./config/passport');

//avoid compatibility problems with browsers
app.use(cors());

app.use(morgan("dev"));

//for read request with json format
app.use(express.json());

//Middlewares

  app.use(passport.initialize());
  app.use(passport.session());

app.use(bookRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listen http://localhost:${port}`);
});