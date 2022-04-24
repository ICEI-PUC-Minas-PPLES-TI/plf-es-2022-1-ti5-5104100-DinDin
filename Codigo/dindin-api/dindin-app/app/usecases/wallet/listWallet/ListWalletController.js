const yup = require("yup");

const AppError = require("../../../errors/AppError");
const ListWalletUseCase = require("./ListWalletUseCase");

const orderEnum = ["ASC", "DESC"];

class ListWalletController {
  async list(request, response) {
    const scheme = yup.object().shape({
      page: yup.number("'value' must be numeric!"),
      limit: yup.number("'value' must be numeric!"),
      attribute: yup.string("'attribute' must be one string!"),
      order: yup
        .mixed()
        .oneOf(orderEnum, `'order' must be one of these: ${orderEnum}.`),
      description: yup
        .string("'description' must be string!")
        .max(30),
      shared: yup
        .boolean("'shared' must be boolean!")
    });

    try {
      await scheme.validate(request.query, { abortEarly: false });
    } catch (error) {
      throw new AppError(error.name, 422, error.errors);
    }

    const listWalletUseCase = new ListWalletUseCase();
    const wallets = await listWalletUseCase.list(request.query, request.userId);

    return response.status(200).json(wallets);
  }

}

module.exports = ListWalletController;