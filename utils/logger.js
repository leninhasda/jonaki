const winston = require('winston');

logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            colorize: true
        }),
        new winston.transports.File({
            filename: 'app.log',
            level: 'info'
        })
    ]
});

module.exports = logger;