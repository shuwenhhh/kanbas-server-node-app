import mongoose from "mongoose";
import schema from "./schema.js";

export const connectDb = () => {
    try {
        const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
        console.log(CONNECTION_STRING);
        mongoose.connect(CONNECTION_STRING);
    } catch (error) {
        console.error('connectDb failed', error);
    }
};

const model = mongoose.model("users", schema);

export default model;
