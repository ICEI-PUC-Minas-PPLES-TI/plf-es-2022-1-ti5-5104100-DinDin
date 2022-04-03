const yup = require("yup");

const AppError = require("../../errors/AppError");
const CreateCategoryUseCase = require("./CreateCategoryUseCase")

class CreateCategoryController {
    async create(request, response) {
        const scheme = yup.object().shape({
            name: yup.string().required(),
            color: yup.mixed().oneOf(['BLUE', 'RED', 'GREEN', 'YELLOW', 'BLACK']).required(),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
          } catch (error) {
            throw new AppError(error.name, 422, error.errors);
          }

          const { name,color } = request.body;

          const createCategoryUseCase = new CreateCategoryUseCase();

          const category = await createCategoryUseCase.create(
            name,
            color
          );

          return response.status(201).json(category);
    }

}

module.exports = CreateCategoryController;
