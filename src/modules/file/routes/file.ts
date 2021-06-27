import { Router } from "express";
import { fileController } from "../controllers/fileController";
import { jwtGuard } from "../../auth/middlewares/jwtGuard";

const router = Router();

router.get("/", fileController.getAll);

router.get("/:id", fileController.getOne);

router.post("/upload", jwtGuard, fileController.handleUpload);

router.post("/save", jwtGuard, fileController.saveFile);

// TODO check if creator is the current user
router.delete("/", jwtGuard, fileController.deleteOne);

export { router };
