import { NextFunction, Request, Response } from "express";
import { JwtPayload, validateJwtToken } from "../services/jwtService";
import {CustomError} from "../../../common/errors/CustomError";

declare global {
    namespace Express {
        export interface Request {
            user: JwtPayload;
        }
    }
}

export const jwtGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.user = validateJwtToken(req.cookies["jwt"]) as JwtPayload;
    } catch (e) {
        return next(new CustomError(400, e.message));    
    }
    
    next();
};
