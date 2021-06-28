import { Handler } from "express";
import { UploadedFile } from "express-fileupload";
import {
    AVAILABLE_MIME_TYPES,
    FILES_PATH,
    MAX_FILE_SIZE,
    processFile,
} from "../services/fileUploadService";
import { CustomError } from "../../../common/errors/CustomError";
import { File } from "../models/File";

export interface FileController {
    getAll: Handler;
    downloadFile: Handler;
    handleUpload: Handler;
    saveFile: Handler;
    deleteOne: Handler;
}

export const fileController: FileController = {
    getAll: async (req, res) => {
        const files = await File.find({ archivedAt: null }).exec();

        return res.status(200).json(files);
    },

    downloadFile: async (req, res, next) => {
        try {
            const file = await File.findById(req.params.id).exec();

            if (!file) {
                return next(new CustomError(400, "File not found."));
            }

            if (!!file.archivedAt) {
                return next(new CustomError(400, "File was removed."));
            }

            const storedFile = `${FILES_PATH}/${file.name}`;

            res.download(storedFile);
        } catch (e) {
            return next(new CustomError(500, e.message));
        }
    },

    handleUpload: async (req, res, next) => {
        if (!req.files?.userFile) {
            return next(new CustomError(400, "Failed to upload file."));
        }

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

    saveFile: async (req, res, next) => {
        const file = new File({ name: req.body.name, user: req.user.id });

        try {
            const fileDoc = await file.save();

            res.status(201).json(fileDoc);
        } catch (e) {
            next(new CustomError(500, e.message));
        }
    },

    deleteOne: async (req, res, next) => {
        const file = await File.findById(req.params.id).exec();

        if (file.user.toString() === req.user.id) {
            next(new CustomError(403, "Cannot delete other user's files."));
        }

        try {
            file.archivedAt = new Date();
            await file.save();

            res.status(204).send();
        } catch (e) {
            next(new CustomError(500, e.message));
        }
    },
};
