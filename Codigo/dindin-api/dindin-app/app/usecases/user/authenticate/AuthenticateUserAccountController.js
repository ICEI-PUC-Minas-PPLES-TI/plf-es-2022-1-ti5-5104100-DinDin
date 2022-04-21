
const yup = require("yup");

const AppError = require("../../../errors/AppError");
const AuthenticateUseCase = require("./AuthenticateUserAccountUseCase")

class AuthenticateController {

  async handle(request, response) {
    const scheme = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
    });

    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }
    const { email, password } = request.body;

    const authenticateUseCase = new AuthenticateUseCase();
    const token = await authenticateUseCase.execute(
      email,
      password
    );

    return response.status(200).json({
      token
    });
  }

}

module.exports = AuthenticateController;
