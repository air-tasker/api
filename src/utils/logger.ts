const winston = require('winston');

const logger = winston.createLogger({
    level: winston.config.syslog.levels,
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log'})
    ]
});

export default class Logger
{
    public logErrors (err)
    {
        logger.log('error', err.stack);
        console.log('log: ', err)
    }

    public info (msg) {
        logger.log('error', msg)
    }
}
