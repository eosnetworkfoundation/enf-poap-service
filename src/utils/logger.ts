import { createLogger, format, transports } from 'winston';

//
// Transports
//
const logFileTransport = new transports.File({
    filename: 'logs/application.log',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
});

const consoleTransport = new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
});

//
//  Logger
//
const logger = createLogger({
    transports: [logFileTransport],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(consoleTransport);
}

export default logger;
