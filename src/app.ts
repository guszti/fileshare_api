import * as dotenv from "dotenv";
dotenv.config();
//
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
//
import { router as fileRouter } from "./modules/file/routes/file";
import { router as authRouter } from "./modules/auth/routes/auth";
import { errorMiddleware } from "./common/middlewares/errorMiddleware";

const app = express();

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

// TODO
//  Lists all the available/uploaded files (file name, date and time of upload)
//  Provides an option to retrieve sharable file link for the specific images
//  Provides file upload capability to the users. Files should not be bigger than 3MB.
/*************************************************************************************/
// TODO
//  Users can authenticate
//  Show user name on frontend
//  Only authenticated user can upload files
//  The user who uploaded the file can delete it
//  Store the files in the cloud (e.g.: AWS S3, free tier is available for anybody at most cloud providers)
