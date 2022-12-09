export class NotFoundError extends Error {
    constructor(message?: string) {
        super(message || 'Item não encontrado');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}