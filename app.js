import express from "express"
import Hello from "./hello.js"
import Lab5 from "./Lab5.js"
import cors from "cors";
import bodyParser from "body-parser";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Assignments/routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
Hello(app)
Lab5(app)
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000);



