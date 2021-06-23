import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.listen(4000, () => console.log("App is listening on port 4000."));
