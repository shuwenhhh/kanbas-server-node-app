import mongoose from "mongoose";
import schema from "./schema.js";

export const connectDb = () => {
    try {
        const url = process.env.DB_URL;
        console.log('connectDb:', { url });
        if (url) {
            mongoose.connect(url);
        } else {
            throw new Error('DB_URL not found');
        }
    } catch (error) {
        console.error('connectDb failed', error);
    }
};

const model = mongoose.model("users", schema);

export default model;
