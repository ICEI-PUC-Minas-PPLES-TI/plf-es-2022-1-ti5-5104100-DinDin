const yup = require("yup");

const AppError = require("../../../errors/AppError");

const DeleteWalletUseCase = require("./DeleteWalletUseCase");


class DeleteWalletController {
  async delete(request, response) {
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

    const deleteWalletUseCase = new DeleteWalletUseCase()
    await deleteWalletUseCase.delete(id);

    return response.status(204).json();

  }
}

module.exports = DeleteWalletController;