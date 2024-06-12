// related third-party imports
import { Router } from "express";

// local imports
import { Scrapes } from "../dao/scrapes.js";
import fetchData from "../scrapeUrl.js";
import logger from "../loggers/logger.js";

var scrapedRoute = Router();

scrapedRoute.post("/create", async (req, res) => {
    const scrapesdao = new Scrapes();
    const data = req.body;

    try {
        const scrapedData = await fetchData(data.url);
        const dataCreated = await scrapesdao.createScrape(scrapedData);
        if (dataCreated) {
            const response = {
                success: true,
                message: "Data has been created successfully.",
                data: dataCreated,
            };
            return res.status(201).json(response);
        }
    } catch (error) {
        logger.error(error);
        const response = {
            success: false,
            message: error.message,
        };
        return res.status(400).json(response);
    }
});

scrapedRoute.get("/", async (req, res) => {
    const scrapesdao = new Scrapes();

    try {
        const dataList = await scrapesdao.getScrapes();
        const response = {
            success: true,
            message: "Data list fetched successfully.",
            data: dataList,
        };
        return res.status(200).json(response);
    } catch (error) {
        logger.error(error);
        const response = {
            success: false,
            message: error.message,
        };
        return res.status(400).json(response);
    }
});

scrapedRoute.get("/:id", async (req, res) => {
    const scrapesdao = new Scrapes();
    const id = req.params.id;

    try {
        const dataList = await scrapesdao.getScrapedDatabyId(id);
        const response = {
            success: true,
            message: "Data list fetched successfully.",
            data: dataList,
        };
        return res.status(200).json(response);
    } catch (error) {
        logger.error(error);
        const response = {
            success: false,
            message: error.message,
        };
        return res.status(400).json(response);
    }
});

scrapedRoute.post("/delete", async (req, res) => {
    const scrapesdao = new Scrapes();
    const data = req.body;

    try {
        const scrapeIds = data.map((item) => item._id);
        const dataList = await scrapesdao.getScrapedDatabyIds({ scrapeIds });

        for (let index = 0; index < dataList.length; index++) {
            dataList[index].isDeleted = true;
            await scrapesdao.updateScrapedData(dataList[index]);
        }
        const response = {
            success: true,
            message: "Data removed successfully.",
            data: dataList,
        };
        return res.status(200).json(response);
    } catch (error) {
        logger.error(error);
        const response = {
            success: false,
            message: error.message,
        };
        return res.status(400).json(response);
    }
});

const _scrapedRoute = scrapedRoute;
export { _scrapedRoute as scrapedRoute };
