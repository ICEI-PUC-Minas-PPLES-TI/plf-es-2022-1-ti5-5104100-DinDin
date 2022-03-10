const UserFindAccountUseCase = require("./UserFindAccountUseCase")

class UserFindAccountController {

  async find(request, response) {

    const id = request.params.id;
    console.log(id)

    const userFindAccountUseCase = new UserFindAccountUseCase();
    const user = await userFindAccountUseCase.find(
      id
    );

    return response.status(200).json(user);
  }

}

module.exports = UserFindAccountController;
