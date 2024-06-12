// related third-party imports
import { connect } from "mongoose";

// local imports
import logger from "../loggers/logger.js";

const connectDB = async (url) => {
    try {
        await connect(url);
        return logger.info("Connected to the DB...");
    } catch (error) {
        return logger.error(error);
    }
};

export { connectDB };
