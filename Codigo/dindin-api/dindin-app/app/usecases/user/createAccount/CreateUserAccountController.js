const yup = require("yup");

const AppError = require("../../../errors/AppError");
const CreateUserAccountUseCase = require("./CreateUserAccountUseCase");

class CreateUserAccountController {
    async create(request, response) {
        const scheme = yup.object().shape({
            name: yup
                .string("'name' must be string")
                .max(100)
                .required("'name' is a required field"),
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

        const { name, email, password } = request.body;

        const createUserAccountUseCase = new CreateUserAccountUseCase();
        const user = await createUserAccountUseCase.create(
            name,
            email,
            password
        );

        return response.status(201).json({
            user,
        });
    }
}

module.exports = CreateUserAccountController;
