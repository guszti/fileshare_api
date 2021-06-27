import jwt from "jsonwebtoken";
import { CustomError } from "../../../common/errors/CustomError";

export interface JwtPayload {
    username: string;
    id: string;
}

export const createJwtToken = (payload: JwtPayload) =>
    jwt.sign({ ...payload }, process.env.JWT_SECRET);

export const validateJwtToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        throw new CustomError(401, e.message);
    }
};

export const tokenExpiration = new Date(new Date().getTime() + 1800000);
