const express = require('express');
const app = express.Router();

app.use('/', require('./home'));
app.use('/post', require('./post'));
app.use('/tag', require('./tag'));
console.log(express.Router());
module.exports = app;