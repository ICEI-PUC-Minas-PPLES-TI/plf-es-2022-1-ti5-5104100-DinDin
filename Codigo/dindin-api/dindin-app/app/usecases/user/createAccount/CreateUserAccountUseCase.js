const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AppError = require("../../../errors/AppError");
const User = require("../../../models/User");

class CreateUserAccountUseCase {

  async create(name, email, password) {
    const bcryptPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({
      name,
      email,
      password: bcryptPassword,
    }).catch(error => {
      throw new AppError(error.message, 500, error);
    });
    return {'id': user.id};
  }

}

module.exports = CreateUserAccountUseCase;
