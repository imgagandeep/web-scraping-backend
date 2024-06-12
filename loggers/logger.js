// related third-party imports
import { createLogger, format, transports } from "winston";

const customFormat = format.combine(
    format.timestamp(),
    format.printf((info) => {
        return `${info.timestamp} - ${info.level} - ${info.message}`;
    })
);

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: "config.log" }),
    ],
});

export default logger;
