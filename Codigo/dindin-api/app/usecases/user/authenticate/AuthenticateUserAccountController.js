const yup = require("yup");

const AppError = require("../../../errors/AppError");
const AuthenticateUserAccountUseCase = require("./AuthenticateUserAccountUseCase");

class AuthenticateUserAccountController {
    async login(request, response) {
        const defaultLoginScheme = yup.object().shape({
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
        const federatedLoginScheme = yup.object().shape({
            firebaseToken: yup.string().required(),
        });

        // primeiro tenta validar o body para o login normal
        try {
            await defaultLoginScheme.validate(request.body, {
                abortEarly: false,
            });
        } catch (error) {
            // se não conseguir, tenta validar para o login federado (google)
            await federatedLoginScheme
                .validate(request.body, { abortEarly: false })
                .catch(
                    /* istanbul ignore next */ () => {
                        // se não conseguir também, será lançado uma excessão correspondente ao
                        // erro de validação do primeiro caso ( login normal )
                        throw new AppError(error.name, 422, error.errors);
                    }
                );
        }
        let { email, password, firebaseToken } = request.body;

        const authenticateUseCase = new AuthenticateUserAccountUseCase();
        let token;
        let userId;
        if (email && password) {
            const {
                jwt,
                firebaseToken: _firebaseToken,
                userId: _userId,
            } = await authenticateUseCase.executeForLocalAuth(email, password);

            token = jwt;
            userId = _userId;
            firebaseToken = _firebaseToken;
        } else {
            const { jwt, userId: _userId } =
                await authenticateUseCase.executeForFirebaseAuth(firebaseToken);

            token = jwt;
            userId = _userId;
        }

        return response.status(200).json({
            token,
            firebaseToken,
            userId,
        });
    }
}

module.exports = AuthenticateUserAccountController;
