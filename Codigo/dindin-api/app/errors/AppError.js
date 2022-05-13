class AppError {
    constructor(message, statusCode = 500, error) {
        if (message == "ValidationError") {
            this.message = "Field validation error!";
            this.statusCode = statusCode;
            this.error = error;
        } else {
            this.message = message;
            this.statusCode = statusCode;
            this.error = error;
        }
    }
}

module.exports = AppError;
