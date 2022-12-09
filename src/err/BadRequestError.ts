export class BadRequestError extends Error {
    constructor(message?: string) {
        super(message || 'Algo enviado errado');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}