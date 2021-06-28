import { User } from "../models/User";

export const isUsernameUnique = (username: string) => {
    return User.findOne({ username }).then((user) => {
        if (!!user) {
            return Promise.reject("Username is already taken.");
        }
    });
};
