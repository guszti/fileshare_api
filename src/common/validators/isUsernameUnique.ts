import { body, CustomValidator } from "express-validator";
import { User } from "../../modules/auth/models/User";

export const isUsernameUnique = (username: string) => {
    return User.findOne({ username }).then((user) => {
        if (!!user) {
            return Promise.reject("Username is already taken.");
        }
    });
};
