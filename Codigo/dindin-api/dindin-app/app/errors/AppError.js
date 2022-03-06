class AppError {
    constructor(message, statusCode = 500, error) {
      if (message == "ValidationError") {
        /* Yup */ this.message = "Erro na validação dos campos!";
        this.statusCode = 422;
        this.error = error;
      } else if (message == "Validation error") {
        /* Sequelize */ this.message = "Erro na validação dos campos!";
        this.statusCode = 422;
        this.error = error;
      } else if (error.name == "SequelizeValidationError") {
        /* Sequelize */ this.message = "Erro na validação dos campos!";
        this.statusCode = 422;
        delete error.errors[0].instance; // Removendo objeto com possíveis dados
        this.error = error;
      } else {
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
      }
    }
  }
  
  module.exports = AppError;