//package dotenv for use environment variables from .env file
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//import routes
const bookRoutes = require("./routes/books.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

//avoid compatibility problems with browsers
app.use(cors());

app.use(morgan("dev"));

//for read request with json format
app.use(express.json());

app.use(bookRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listen http://localhost:${port}`);
});