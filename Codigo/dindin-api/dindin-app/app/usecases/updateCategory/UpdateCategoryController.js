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
            name: yup.string().required(),
            color: yup.mixed().oneOf(['BLUE', 'RED', 'GREEN', 'YELLOW', 'BLACK']).required(),
        });
        try {
            await scheme.validate(request.body, { abortEarly: false });
          } catch (error) {
            throw new AppError(error.name, 422, error.errors);
          }
        
          const { name,color } = request.body;

          const updateCategoryUseCase = new UpdateCategoryUseCase();

          const category = await updateCategoryUseCase.update(
            id,  
            name,
            color
          );

          return response.status(201).json(category);

    }
}

module.exports = UpdateCategoryController;