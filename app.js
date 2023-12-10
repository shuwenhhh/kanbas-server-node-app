import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Assignments/routes.js";
import 'dotenv/config';
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";



//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);

const app = express();
console.log(process.env.FRONTEND_URL);
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

// app.use(cors());

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));

app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);