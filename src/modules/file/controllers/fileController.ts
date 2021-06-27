import { Handler } from "express";
import { UploadedFile } from "express-fileupload";
import {
    AVAILABLE_MIME_TYPES,
    MAX_FILE_SIZE,
    processFile,
} from "../services/fileUploadService";
import { CustomError } from "../../../common/errors/CustomError";

export interface FileController {
    getAll: Handler;
    getOne: Handler;
    handleUpload: Handler;
    saveFile: Handler;
    deleteOne: Handler;
}

export const fileController: FileController = {
    getAll: () => {
        // TODO
        //  just get all the files where archivedAt is null
    },

    getOne: () => {
        // TODO
        //  check archivedAt
        //  stream the file
    },

    handleUpload: async (req, res, next) => {
        const { size, mimetype } = req.files.userFile as UploadedFile;

        const isTooLarge = size > MAX_FILE_SIZE;
        const isMimeUnsupported = !AVAILABLE_MIME_TYPES.includes(mimetype);

        if (isTooLarge) {
            return next(new CustomError(400, "Maximum file size is 3MB."));
        }

        if (isMimeUnsupported) {
            return next(new CustomError(400, "File extension not supported."));
        }

        try {
            const fileName = processFile(req.files.userFile as UploadedFile);

            return res.status(200).send({ name: fileName });
        } catch (e) {
            return next(new CustomError(500, e.message));
        }
    },

    saveFile: () => {
        // TODO
        //  check if file exists
        //  create doc
        //  save
    },

    deleteOne: () => {
        // TODO
        //  find file
        //  check if user is the current user
        //  set archivedAt to new Date()
    },
};
