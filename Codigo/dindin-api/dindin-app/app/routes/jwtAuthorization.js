const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
require("dotenv").config();

const verifyToken = (request, response, next) => {
  let token = request.headers["authorization"];

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

const logIn = (id) => {
  // 1 day in seconds: 86400
  const days = 90;
  const seconds = 86400 * days;
  const token = jwt.sign(
    {
      id: id
    },
    process.env.SECRET_KEY,
    {
      expiresIn: seconds
    }
  );
  return token;
};

const jwtAuthorization = {
  verifyToken,
  logIn
};

module.exports = jwtAuthorization;
