import mongoose from "mongoose";
import schema from "./schema.js";

const PROD_URI = 'mongodb+srv://giuseppi:supersecretpassword@cluster0.eerap.mongodb.net/kanbas?retryWrites=true&w=majority'

export const connectDb = () => {
    try {
        const CONNECTION_STRING = process.env.DB_URL || PROD_URI;
        console.log(CONNECTION_STRING);
        mongoose.connect(CONNECTION_STRING);
    } catch (error) {
        console.error('connectDb failed', error);
    }
};

const model = mongoose.model("users", schema);

export default model;
