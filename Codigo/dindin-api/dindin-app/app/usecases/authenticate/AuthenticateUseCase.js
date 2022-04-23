const AppError = require("../../errors/AppError");
const User = require("../../models/User");

const bcrypt = require("bcryptjs");
const jwtAuthorization = require("../../routes/jwtAuthorization");

const { firebaseServices } = require("../../services/firebaseServices");

class AuthenticateUseCase {

  // ver como vai ser estruturado isso, se vai ser necessário
  // criar outro arquivo ou algo do tipo
  async executeForLocalAuth(email, password) {
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
    const jwt = jwtAuthorization.logIn(user.id);
    const firebaseToken = await firebaseServices.generateFirebaseAuthToken(user.id);

    return {
      jwt,
      firebaseToken
    }
  }

  async executeForFirebaseAuth(firebaseToken) {
    let firebaseId;
    try {
      firebaseId = await firebaseServices.getFirebaseIdByToken(firebaseToken);
    } catch (error) {
      console.log(error)
      throw new AppError("Não foi possível fazer login com entidade federada", 401);
    }

    console.log(firebaseId);

    let user = await User.findOne({
      where: { firebaseId },
      attributes: {
        include: "id"
      }
    })

    console.log(user)

    if (!user){
      const {
        email,
        displayName: name
      } = await firebaseServices.getFirebaseUserById(firebaseId);

      console.log(email, name, firebaseId);

      user = await User.create({
        name,
        email,
        firebaseId
      }).catch(error => {
        throw new AppError(error.message, 500, error);
      });
    }

    // gerar jwt
    return jwtAuthorization.logIn(user.id);
  }

}

module.exports = AuthenticateUseCase;
