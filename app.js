import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Assignments/routes.js";
import 'dotenv/config';
import UserRoutes from "./users/routes.js";
import session from "express-session";
import { connectDb } from './users/model.js';

connectDb();

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