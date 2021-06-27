import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.message);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.getFormattedErrors());
    }

    return res.status(500).send(err.message);
};
