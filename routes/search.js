const express = require('express');
const app = express.Router();

app
.get('/:q', (req, res, next) => {
    return res.send('search query is: ' +req.params.q);
});

module.exports = app;