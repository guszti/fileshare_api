import { Router } from "express";
import { fileController } from "../controllers/fileController";

const router = Router();

router.get("/", fileController.getAll);

router.get("/:id", fileController.getOne);

router.post("/", fileController.createOne);

export { router };
