// related third-party imports
import "dotenv/config";
import cors from "cors";
import express, { json, urlencoded } from "express";

// local imports
import { connectDB } from "./db/connect.js";
import { scrapeRoute } from "./routes/scrapeRoute.js";
import logger from "./loggers/logger.js";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/images", express.static("images"));
app.set("view engine", "ejs");
app.set("view options", {
    layout: false,
});

app.use("/api/v1", scrapeRoute);

// Listen on port 5000
const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, logger.info(`Server is listening on port ${PORT}...`));
    } catch (error) {
        logger.error(error);
    }
};

start();
