import {Handler} from "express";

export interface FileController {
    getAll: Handler;
    getOne: Handler;
    createOne: Handler;
}

export const fileController: FileController = {
    getAll: () => {
        
    },
    getOne: () => {
        
    },
    createOne: () => {
        
    }
}