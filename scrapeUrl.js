// related third-party imports
import axios from "axios";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

// local imports
import logger from "./loggers/logger.js";

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let domain = new URL(url);
        domain = domain.hostname;
        domain = domain.replace("www.", "");
        domain = domain.split(".")[0];

        let phone = "";
        let email = "";
        let facebook = "";
        let instagram = "";
        let twitter = "";
        let linkedin = "";

        $("a").each((i, link) => {
            try {
                const href = link.attribs.href;
                if (href.includes("tel:")) {
                    phone = href.replace("tel:", "");
                } else if (href.includes("mailto:")) {
                    email = href.replace("mailto:", "");
                } else if (href.includes("facebook.com")) {
                    facebook = href;
                } else if (href.includes("linkedin.com")) {
                    linkedin = href;
                } else if (href.includes("twitter.com")) {
                    twitter = href;
                } else if (href.includes("instagram.com")) {
                    instagram = href;
                }
            } catch (error) {}
        });

        // take a screenshot
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        // wait for the selector appear on the page
        await page.screenshot({
            type: "png", // can also be "jpeg" or "webp" (recommended)
            path: `public/images/${domain}.png`, // where to save it
            fullPage: true, // will scroll down to capture everything if true
        });

        const data = {
            name: domain,
            title: $("title").first().text(),
            description: $("meta[name='description']").attr("content"),
            companyLogo:
                $('link[rel="icon"]').attr("href") ||
                $('link[rel="shortcut icon"]').attr("href"),
            socialMedia: {
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
                linkedin: linkedin,
            },
            screenshot: `images/${domain}.png`,
            website: url,
            address: "",
            phone: phone,
            email: email,
        };

        return data;
    } catch (error) {
        logger.error(error);
    }
}

function getDomain(url) {
    url = url.replace(/(https?:\/\/)?(http?:\/\/)?(www.)?/i, "");
    url = url.split(".")[0];

    return url;
}

export default fetchData;
