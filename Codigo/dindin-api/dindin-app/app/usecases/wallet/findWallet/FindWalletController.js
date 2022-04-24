const yup = require("yup");

const AppError = require("../../../errors/AppError");

const FindWalletUseCase = require("./FindWalletUseCase");


class FindWalletController {
  async find(request, response) {
    const scheme = yup.object().shape({
      id: yup
        .number("'id' must be numeric!")
        .min(1)
        .required(),
    });

    try {
      await scheme.validate(request.params, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }

    const { id } = request.params;
    
    const findWalletUseCase = new FindWalletUseCase();
    const wallet = await findWalletUseCase.find(
      id
    );
    return response.status(200).json(wallet);
  }
}

module.exports = FindWalletController;