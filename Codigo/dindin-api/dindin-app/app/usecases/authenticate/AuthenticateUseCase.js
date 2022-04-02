const AppError = require("../../errors/AppError");
const User = require("../../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtAuthorization = require("../../routes/jwtAuthorization");

class AuthenticateUseCase {

  async execute(email, password) {
    const user = await User.findOne({
      where: { email },
      attributes: {
        include: "password"
      }
    })

    if (!user)
      throw new AppError("Não existe usuário com esse e-mail cadastrado o sistema", 401);

    const arePasswordsEqual = await bcrypt.compare(password, user.password);
    if (!arePasswordsEqual)
      throw new AppError("Senha incorreta!", 401);

    // gerar jwt
    return jwtAuthorization.logIn(user.id);
  }

}

module.exports = AuthenticateUseCase;
