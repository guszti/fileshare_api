import * as dotenv from "dotenv";
dotenv.config();
//
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
//
import { router as fileRouter } from "./modules/file/routes/file";
import { router as authRouter } from "./modules/auth/routes/auth";
import { errorMiddleware } from "./common/middlewares/errorMiddleware";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/auth", authRouter);
app.use("/files", fileRouter);

app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to database.");
    } catch (e) {
        console.error(e.message);
    }

    app.listen(4000, () => console.log("App is listening on port 4000."));
};

start();
