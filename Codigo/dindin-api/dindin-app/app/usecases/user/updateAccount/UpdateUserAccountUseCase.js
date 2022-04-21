const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AppError = require("../../../errors/AppError");
const User = require("../../../models/User");
const FindUserAccountUseCase = require("../findAccount/FindUserAccountUseCase");

class UpdateUserAccountUseCase {

  async update(id, name, password) {

    const findUserAccountUseCase = new FindUserAccountUseCase();
    const user = await findUserAccountUseCase.find(id);

    const bcryptPassword = bcrypt.hashSync(password, 8);
    await user.update({
      name,
      password: bcryptPassword,
    }).catch(error => {
      throw new AppError(error.message, 500, error);
    });
    return {'id': user.id};
  }

}

module.exports = UpdateUserAccountUseCase;
