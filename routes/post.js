const express = require('express');
const app = express.Router();

app
.get('/:slug', (req, res, next) => {
    return res.send(req.params.slug + ' should be loaded here');
});

module.exports = app;