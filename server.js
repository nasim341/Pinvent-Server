const { readdirSync } = require("fs");
const path = require("path");
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
require("dotenv").config();
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler")


app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

//rotes middleware
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

//server
const port = process.env.PORT || 5000;

//error middleware
app.use(errorHandler)

mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log(`server Running on port @${port}`)
        })
    })
    .catch((err) => console.log(err));