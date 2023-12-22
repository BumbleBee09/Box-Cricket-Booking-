const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin : "http://localhost:3000",
    optionsSuccessStatus: 200
}));

// To connect with the database, code is written in the connect.js file, so just requiring it.
require('./db/conn');


// for securing the important keys like jwt token, database connection string etc., we put it into the .env file
const dotenv = require('dotenv');
dotenv.config({ path : './config.env' });
const port = process.env.PORT || 5000;  // Port number is secured.


// middleware to handle the json data, putting it before linking the routes otherwise routes would be linked but any json data would not be parsed.
app.use(express.json());

// middleware for linking all the routes since they are stored in a single file
app.use(require('./routers/auth'));


app.listen(port, () => {
    console.log(`Server is successfullly running at ${port}........`)
})