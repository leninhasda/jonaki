const express = require('express');
app = express.Router();

// base uri: /
app.get('/', (req, res, next) => {

    return res.send("all the post list goes here");
});

module.exports = app;