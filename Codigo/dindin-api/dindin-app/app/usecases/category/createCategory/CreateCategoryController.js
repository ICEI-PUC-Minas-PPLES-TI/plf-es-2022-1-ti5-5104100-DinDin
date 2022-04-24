const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateCategoryUseCase = require("./CreateCategoryUseCase");

class CreateCategoryController {
  async create(request, response) {
    const scheme = yup.object().shape({
      wallet_id: yup.number("'wallet_id' must be numeric!").required(),
      user_id: yup.number("'user_id' must be numeric!").required(),
      description: yup.string().required().max(100),
      type: yup.mixed().oneOf(["IN", "OUT"]).required(),
      color: yup.string().required().max(10),
    });

    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }

    const { wallet_id, user_id, description, type, color } = request.body;

    const createCategoryUseCase = new CreateCategoryUseCase();

    const category = await createCategoryUseCase.create(
      wallet_id,
      user_id,
      description,
      type,
      color
    );

    return response.status(201).json(category);
  }
}

module.exports = CreateCategoryController;
