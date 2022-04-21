
const yup = require("yup");

const AppError = require("../../../errors/AppError");
const AuthenticateUserAccountUseCase = require("./AuthenticateUserAccountUseCase")

class AuthenticateUserAccountController {

  async login(request, response) {
    const scheme = yup.object().shape({
      email: yup
        .string("'email' must be string")
        .email("'email' must be a email")
        .max(150)
        .required("'email' is a required field"),
      password: yup
        .string("'password' must be string")
        .min(8)
        .required("'password' is a required field"),
    });

    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }
    const { email, password } = request.body;

    const authenticateUserAccountUseCase = new AuthenticateUserAccountUseCase();
    const token = await authenticateUserAccountUseCase.login(
      email,
      password
    );

    return response.status(200).json({
      token
    });
  }

}

module.exports = AuthenticateUserAccountController;
