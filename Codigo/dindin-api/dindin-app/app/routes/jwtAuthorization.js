const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const verifyToken = (request, response, next) => {
  let token = request.headers["Authorization"];

  if (!token) {
    throw new AppError(
      "Falha ao autenticar no sistema, autenticação não fornecida.",
      403,
      ["Token de autenticação não fornecido."]
    );
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new AppError(
        "Falha ao autenticar no sistema!!",
        403,
        ["Falha ao autenticar o token!!", err]
      );
    }
    request.user = decoded;
    request.userId = decoded.id;
    next();
  });
};

const jwtAuthorization = {
  verifyToken,
};

module.exports = jwtAuthorization;
