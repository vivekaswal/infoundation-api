import { createLogger, format, transports } from 'winston'
import path from 'path';

const __base = path.resolve(__dirname, "../../");
const env = process.env.NODE_ENV || "dev";
const isDev = env.indexOf("dev") !== -1;



// change level if in dev environment versus production
const level = "info";
const winstFormat = format.combine(
    format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.json()
);
const options = {
    file: {
        level: "info",
        name: "file.info",
        filename: `${__base}/logs/log-${new Date().toLocaleDateString().replace(/\//g, "-")}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true
    },
    errorFile: {
        level: "error",
        name: "file.error",
        filename: `${__base}/logs/log-${new Date().toLocaleDateString().replace(/\//g, "-")}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
        format: format.combine(
            format.colorize(),
            format.printf((info) => {
                return `${info.timestamp} [${info.level}] ${info.message}`;
            })
        )
    }
};


const logger = createLogger({
    level: level,
    format: winstFormat,
    transports: [
        new transports.Console(options.console),
        new transports.File(options.errorFile),
        new transports.File(options.file)
    ]
});
export =logger; 
