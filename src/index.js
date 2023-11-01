import express from "express";
import { userRouter } from "./routes/user.route.js";
import dotenv from "dotenv";
import { GlobalError } from "./middlewares/global-error.middleware.js";
// import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
// app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/users", userRouter);
app.use(GlobalError.handle)

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});