// related third-party imports
import { Router } from "express";

// local imports
import { scrapedRoute } from "../crud/scrape.js";

var scrapeRoute = Router();

scrapeRoute.use("/scrape", scrapedRoute);

const _scrapeRoute = scrapeRoute;
export { _scrapeRoute as scrapeRoute };
