// local imports
import ScrapedData from "../schema/ScrapedData.js";
import logger from "../loggers/logger.js";

class ScrapesDAO {
    async createScrape(props) {
        try {
            const response = await ScrapedData.create({
                name: props.name,
                title: props.title,
                description: props.description,
                companyLogo: props.companyLogo,
                screenshot: props.screenshot,
                website: props.website,
                email: props.email,
                phone: props.phone,
                address: props.address,
                socialMedia: props.socialMedia,
            });
            return response;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async getScrapes() {
        const scrapedData = await ScrapedData.find({ isDeleted: false });
        return scrapedData;
    }

    async getScrapedDatabyId(id) {
        try {
            const scrapedData = await ScrapedData.findOne({ _id: id });
            return scrapedData;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async getScrapedDatabyIds(props) {
        try {
            const scrapedData = await ScrapedData.find({
                $and: [{ _id: { $in: props.scrapeIds } }, { isDeleted: false }],
            });
            return scrapedData;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }

    async updateScrapedData(data) {
        try {
            const response = await data.save();
            return response;
        } catch (error) {
            logger.error(error);
            return error;
        }
    }
}

const _Scrapes = ScrapesDAO;
export { _Scrapes as Scrapes };
