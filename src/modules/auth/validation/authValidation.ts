import { body } from "express-validator";
import { isUsernameUnique } from "../validators/isUsernameUnique";

export const SIGN_UP_VALIDATOR = [
    body("username").isLength({ min: 3, max: 30 }).custom(isUsernameUnique),
    body("password").isLength({ min: 4, max: 100 }),
];

export const SIGN_IN_VALIDATOR = [
    body("username").notEmpty(),
    body("password").notEmpty(),
];
