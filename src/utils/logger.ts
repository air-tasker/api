const winston = require('winston');
const {format} = require('winston');

export default class Logger
{
    logger;

    constructor() {

        this.logger = winston.createLogger({
            level: winston.config.syslog.levels,
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'info'
                })
            ]
        });
    }

    public error (err)
    {
        this.logger.log('error', err.stack);
        console.log('log: ', err)
    }

    public info (msg) {
        this.logger.log('info',msg)
    }
}
