class DomainError extends Error {
    constructor(message) {
        super(message)
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name
        this.status = ''
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor)
    }
}

class BadRequestError extends DomainError {
    constructor(message) {
        super(message)
        this.data = message
        this.status = 400
    }
}

class ConflictError extends DomainError {
    constructor(message) {
        super(message)
        this.data = message
        this.status = 409
    }
}

class InternalError extends DomainError {
    constructor(message) {
        super(message)
        this.data = message
        this.status = 500
    }
}

module.exports = {
    BadRequestError,
    ConflictError,
    DomainError,
    InternalError,
};
