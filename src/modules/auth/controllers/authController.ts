import { Handler } from "express";
import { User } from "../models/user";
import { createJwtToken, tokenExpiration } from "../services/jwtService";
import {
    comparePasswords,
    makePasswordHash,
} from "../services/passwordService";
import { CustomError } from "../../../common/errors/CustomError";

interface AuthController {
    signUp: Handler;
    signIn: Handler;
    signOut: Handler;
}

const authController: AuthController = {
    signUp: async (req, res, next) => {
        const { username, password } = req.body;

        const passwordHash = await makePasswordHash(password);

        const user = new User({ username, passwordHash });

        try {
            await user.save();
        } catch (e) {
            return next(new CustomError(500, e.message));
        }

        const jwt = createJwtToken({ username, id: user._id });

        res.cookie("jwt", jwt, {
            secure: false,
            httpOnly: true,
            expires: tokenExpiration,
        });

        res.status(201).send();
    },

    signIn: async (req, res, next) => {
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

        res.status(200).send();
    },

    signOut: (req, res) => {
        res.clearCookie("jwt");
        
        res.status(200).send();
    },
};

export { authController };
