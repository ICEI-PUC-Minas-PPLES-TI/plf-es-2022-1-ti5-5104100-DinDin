
const yup = require("yup");

const AppError = require("../../errors/AppError");
const UserCreateUseCase = require("./UserCreateUseCase")

class UserCreateAccountController {

  async create(request, response) {
    const scheme = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
    });

    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }

    const { name, email, password } = request.body;

    const userCreateUseCase = new UserCreateUseCase();
    const user = await userCreateUseCase.create(
      name,
      email,
      password
    );

    return response.status(201).json({
      user
    });
  }

}

module.exports = UserCreateAccountController;
