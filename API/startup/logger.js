const { transports, createLogger, format } = require("winston");
const { combine, timestamp, prettyPrint } = format;
require("winston-mongodb");

const logger = createLogger({
    level: 'error',
    format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: "logs/logs.log", level: "error", maxFiles:'3d'}),
        new transports.File({filename: "logs/exceptions.log" ,level:"error", handleExceptions: true, handleRejections: true, maxFiles:'3d'}),
        new transports.MongoDB({
            level: 'error',
            db: process.env.MONGODB_URL,
            options: {
                useUnifiedTopology: true
            },
            collection: "server_logs"
        })
    ]
});

module.exports = logger;