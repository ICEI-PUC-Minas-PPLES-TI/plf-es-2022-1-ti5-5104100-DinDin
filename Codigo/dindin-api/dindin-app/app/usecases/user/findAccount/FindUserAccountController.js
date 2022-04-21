const FindUserAccountUseCase = require("./FindUserAccountUseCase")

class FindUserAccountController {

  async find(request, response) {
    const id = request.params.id;
    const userFindAccountUseCase = new FindUserAccountUseCase();
    const user = await userFindAccountUseCase.find(
      id
    );
    return response.status(200).json(user);
  }

}

module.exports = FindUserAccountController;
