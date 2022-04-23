const { ValidationError } = require("yup");

class AppError {
  constructor(message, statusCode = 500, error) {
    if (message == "ValidationError") {
      this.message = "Erro na validação dos campos!";
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
