import { ValidationError } from "express-validator";
import { forEach } from "lodash";

interface FormattedCustomError {
    message: string;
    fieldErrors?: { [key: string]: string };
}

export class CustomError extends Error {
    constructor(
        public statusCode: number,
        private errorMessage: string,
        private fieldErrors?: ValidationError[]
    ) {
        super(errorMessage);
    }

    getFormattedErrors() {
        const errorObject: FormattedCustomError = {
            message: this.message,
        };

        if (this.fieldErrors && !!this.fieldErrors.length) {
            const errors: { [field: string]: string } = {};

            forEach(this.fieldErrors, (fieldError: ValidationError) => {
                errors[fieldError.param] = fieldError.msg;
            });

            errorObject.fieldErrors = errors;
        }

        return errorObject;
    }
}
