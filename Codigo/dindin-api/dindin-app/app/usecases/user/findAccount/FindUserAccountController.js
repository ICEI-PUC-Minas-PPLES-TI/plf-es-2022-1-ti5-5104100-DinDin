const FindUserAccountUseCase = require("./FindUserAccountUseCase")

class FindUserAccountController {

  async find(request, response) {
    const id = request.params.id;
    const findUserAccountUseCase = new FindUserAccountUseCase();
    const user = await findUserAccountUseCase.find(
      id
    );
    return response.status(200).json(user);
  }

}

module.exports = FindUserAccountController;
