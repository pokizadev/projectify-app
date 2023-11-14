import express from "express";
import dotenv from "dotenv";
import { GlobalError } from "./middlewares/global-error.middleware.js";
// import cookieParser from "cookie-parser";
import { adminRouter } from "./routes/admin.route.js";
import { projectRouter } from "./routes/project.route.js";
import { teamMemberRouter } from "./routes/team-member.route.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/admins", adminRouter);
app.use("/projects", projectRouter);
app.use("/team-members", teamMemberRouter);

app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});
