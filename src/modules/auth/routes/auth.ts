import { Router } from "express";
import { authController } from "../controllers/authController";
import { jwtGuard } from "../middlewares/jwtGuard";
import {
    SIGN_IN_VALIDATOR,
    SIGN_UP_VALIDATOR,
} from "../validation/authValidation";

const router = Router();

router.post("/sign-up", ...SIGN_UP_VALIDATOR, authController.signUp);

router.post("/sign-in", ...SIGN_IN_VALIDATOR, authController.signIn);

router.post("/sign-out", jwtGuard, authController.signOut);

router.get("/logged-in-user", jwtGuard, authController.loggedInUser);

export { router };
