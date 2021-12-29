require("dotenv").config();

// Package imports
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes/main");
const passwordRoutes = require("./routes/password");

// Initialize express object
const app = express();

// Create variables
const port = process.env.PORT || 3000; // set the localhost port

// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// require passport auth
require("./auth/auth");


// setup routes
app.use("/", routes);
app.use("/", passwordRoutes);

// catch all other routes
app.use((req, res) => {
    res.status(404).json({ message: "404 - Not Found", status: 404 });
});

// handle errors
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message, status: 500});
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});