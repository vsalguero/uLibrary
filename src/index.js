//package dotenv for use environment variables from .env file
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const path = require("path");

//import routes
const bookRoutes = require("./routes/books.routes");
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

if(process.env.NODE_ENV === "production"){
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "../client/build")));
}

//avoid compatibility problems with browsers
app.use(cors());

app.use(morgan("dev"));

//for read request with json format
app.use(express.json());

app.use(cookieParser());

app.use(flash());

//validate is production

//Middlewares

// Authentication configuration

app.use(bookRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listen http://localhost:${port}`);
});
