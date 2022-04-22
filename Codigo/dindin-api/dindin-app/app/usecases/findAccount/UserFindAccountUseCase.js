const AppError = require("../../errors/AppError");
const User = require("../../models/User");

class UserFindUseCase {

  async find(id) {
    const user = await User.findOne({
      where: {
        id: id
      }
    }).catch(error => {
      throw new AppError(error.message, 500, error);
    });
    if(user)
      return user;
    else
      throw new AppError('User not found!', 404)
  }

}

module.exports = UserFindUseCase;