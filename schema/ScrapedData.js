import { Schema, model } from "mongoose";

const ScrapedData = new Schema({
    name: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    website: { type: String, trim: true },
    screenshot: { type: String },
    companyLogo: { type: String },
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    socialMedia: { type: JSON },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
});

export default model("ScrapedData", ScrapedData);
