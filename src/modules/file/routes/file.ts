import { Router } from "express";
import { fileController } from "../controllers/fileController";
import { jwtGuard } from "../../auth/middlewares/jwtGuard";

const router = Router();

router.get("/", fileController.getAll);

router.get("/download/:id", fileController.downloadFile);

router.post("/upload", jwtGuard, fileController.handleUpload);

router.post("/save", jwtGuard, fileController.saveFile);

router.delete("/:id", jwtGuard, fileController.deleteOne);

export { router };
