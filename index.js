require('dotenv').config();
const express = require("express");
const body = require("body-parser");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', error => console.log('failed to connect with database.'));
mongoose.connection.on('connected', connected => console.log('databse connected successfully'));

app.use(body.json());
const router = require('./routes/routes');
app.use('/', router);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Please enter correct format url!"
    })
});

app.get('/', () => {
    res.status(200).json({message: "Connection is live."});
});

const start = () => {
    try {
        app.listen(port, () => {
            console.log("connection is active...");
        })
    } catch (error) {
        console.log(error);
    }
}

start();