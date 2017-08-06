const express = require('express');

app = express.Router();

app.get('/', (req, res, next) => {

    return res.send('hi');
});

module.exports = app;