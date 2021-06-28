import { Handler } from "express";
import { User } from "../models/User";
import { createJwtToken, tokenExpiration } from "../services/jwtService";
import {
    comparePasswords,
    makePasswordHash,
} from "../services/passwordService";
import { CustomError } from "../../../common/errors/CustomError";
import { validationResult } from "express-validator";

interface AuthController {
    signUp: Handler;
    signIn: Handler;
    signOut: Handler;
    loggedInUser: Handler;
}

const authController: AuthController = {
    signUp: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(
                new CustomError(400, "Validation failed.", errors.array())
            );
        }

        const { username, password } = req.body;

        const passwordHash = await makePasswordHash(password);

        const user = new User({ username, passwordHash });

        try {
            const { _id, username } = await user.save();

            const jwt = createJwtToken({ username, id: user._id });

            res.cookie("jwt", jwt, {
                secure: false,
                httpOnly: true,
                expires: tokenExpiration,
            });

            res.status(201).json({ _id, username });
        } catch (e) {
            return next(new CustomError(500, e.message));
        }
    },

    signIn: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(
                new CustomError(400, "Validation failed.", errors.array())
            );
        }

        const { username, password } = req.body;

        const user = await User.findOne({ username }).exec();

        if (!user || !(await comparePasswords(password, user.passwordHash))) {
            return next(new CustomError(400, "Wrong credentials"));
        }

        const jwt = createJwtToken({ id: user._id, username: user.username });

        res.cookie("jwt", jwt, {
            secure: false,
            httpOnly: true,
            expires: tokenExpiration,
        });

        res.status(200).json({ username: user.username, _id: user._id });
    },

    signOut: (req, res) => {
        res.clearCookie("jwt");

        res.status(200).send();
    },

    loggedInUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                res.clearCookie("jwt");

                return res.status(401).send();
            }

            return res.status(200).json(user);
        } catch (e) {
            return next(new CustomError(500, e.message));
        }
    },
};

export { authController };
