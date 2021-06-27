export class CustomError extends Error {
    constructor(
        public statusCode: number,
        private errorMessage: string,
        private fieldErrors?: { [key: string]: string }
    ) {
        super(errorMessage);
    }

    getFormattedErrors() {
        return {
            message: this.message,
            fieldErrors: this.fieldErrors,
        };
    }
}
