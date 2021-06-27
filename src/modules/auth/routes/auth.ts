import { Router } from "express";
import { authController } from "../controllers/authController";
import { jwtGuard } from "../middlewares/jwtGuard";

const router = Router();

router.post("/sign-up", authController.signUp);

router.post("/sign-in", authController.signIn);

router.post("/sign-out", jwtGuard, authController.signOut);

export { router };
