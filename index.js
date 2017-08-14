const bodyParser = require('body-parser');
const express = require('express');
const moment = require('moment');
const fs = require('fs');
const logger = require('./utils/logger');

const notFoundError = require('./utils/404-not-found');
const jonakRender = require('./utils/jonak-render');

const app = express();

app.engine('md', jonakRender(app));
app.set('views', __dirname + '/resources');
app.set('view engine', 'md');
app.use(bodyParser.json());
app.use(express.static(__dirname+'/resources/assets'));

// url logger
// app.use((req, res, next) => {
//     logger.info(req.methd+' '+req.path);
//     next();
// });

// app routes
// app.use(require('./routes')(app));
// app.use('/', require('./routes'));
app.use('/',       require('./routes/home'));
app.use('/post',   require('./routes/post'));
app.use('/tag',    require('./routes/tag'));
app.use('/search', require('./routes/search'));

// error handler
// todo add custom error page
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError &&  400 === err.status) {
        return res.sendStatus(400);
    }
    if (typeof err !== "undefined" && err !== null) {
        logger.error(err.toString());
        return res.sendStatus(500);
    }
});

// 404 handler
app.use((req, res, next) => {
    return notFoundError(req, res);
});

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
};