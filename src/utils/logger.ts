const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

exports.logErrors = (err, req, res, next) => {
    console.error(err.stack);

    logger.log('error', err.stack);

    //res.sendStatus(500);
}