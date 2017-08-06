const express = require('express');
app = express.Router();

app.get('/:tag', (req, res, next) => {
    return res.send('posts having - ' + req.params.tag + ' tag should be loaded here');
});

module.exports = app;