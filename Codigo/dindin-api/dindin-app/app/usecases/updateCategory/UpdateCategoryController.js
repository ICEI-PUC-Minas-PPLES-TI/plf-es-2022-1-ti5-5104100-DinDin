const yup = require("yup");

const AppError = require("../../errors/AppError");
const FindCategoryUseCase = require("../findCategory/FindCategoryUseCase");
const UpdateCategoryUseCase = require("./UpdateCategoryUseCase");

class UpdateCategoryController {
  async update(request, response) {
    const id = request?.params?.id;
    if (!id || !(id > 0))
      return new AppError("Please send a valid id on url", 500);
    //check if category exists...
    const findCategoryUseCase = new FindCategoryUseCase();
    await findCategoryUseCase.find(id);
    const scheme = yup.object().shape({
      wallet_id: yup.number("'wallet_id' must be numeric!"),
      user_id: yup.number("'user_id' must be numeric!"),
      description: yup.string().max(100),
      type: yup.mixed().oneOf(["IN", "OUT"]),
      color: yup.string().max(10),
    });
    try {
      await scheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }

    const { wallet_id, user_id, description, type, color } = request.body;

    const updateCategoryUseCase = new UpdateCategoryUseCase();

    const category = await updateCategoryUseCase.update(
      id,
      wallet_id,
      user_id,
      description,
      type,
      color
    );

    return response.status(201).json(category);
  }
}

module.exports = UpdateCategoryController;
