const bodyParser = require('body-parser');
const express = require('express');
const moment = require('moment');
const fs = require('fs');
const logger = require('./utils/logger');

const app = express();

// app.engine('md', remarkable(app));
app.set('views', __dirname + '/posts');
// app.set('view engine', 'md');
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

// url logger
app.use((req, res, next) => {
    logger.info(req.method+' '+req.path);
    next();
});

// app routes
app.use('/', require('./routes'));

// error handler
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status == 400) {
        return res.sendStatus(400);
    }
    if (typeof err !== "undefined" && err !== null) {
        logger.error(err.toString());
        return res.sendStatus(500);
    }
});

// 404 handler
app.use

let _port = 3000;
const server = app.listen(_port, () => {
    logger.info('Listening on port:'+ _port);
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('exit', () => {
    logger.info('Exiting...');
});

module.exports = {
    app: app,
    server: server
}