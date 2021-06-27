import * as path from "path";
import { UploadedFile } from "express-fileupload";

export const AVAILABLE_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const MAX_FILE_SIZE = 3000000;

export const FILES_PATH = `${path.dirname(
    require.main.path
)}/static/stored-files`;

const makeTimeString = () => {
    const currentDate = new Date();

    return `${currentDate.getUTCDate()}_${currentDate.getUTCMonth()}_${currentDate.getUTCFullYear()}_${currentDate.getUTCHours()}_${currentDate.getUTCMinutes()}_${currentDate.getUTCSeconds()}_${currentDate.getUTCMilliseconds()}`;
};

export const processFile = (file: UploadedFile) => {
    const fileNameArray = file.name.split(".");
    const fileExtension = fileNameArray.pop();
    const originalFileName = fileNameArray.join(".");
    const fileName = `${originalFileName}_${makeTimeString()}.${fileExtension}`;

    const filePath = `${FILES_PATH}/${fileName}`;

    file.mv(filePath, (error) => {
        if (error) {
            throw error;
        }
    });

    return fileName;
};
