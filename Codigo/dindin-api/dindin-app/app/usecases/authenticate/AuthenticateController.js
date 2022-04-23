
const yup = require("yup");

const AppError = require("../../errors/AppError");
const AuthenticateUseCase = require("./AuthenticateUseCase")

class AuthenticateController {

  async handle(request, response) {
    const defaultLoginScheme = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
    });
    const federatedLoginScheme = yup.object().shape({
      firebaseToken: yup.string().required()
    })

    // primeiro tenta validar o body para o login normal
    try {
      await defaultLoginScheme.validate(request.body, { abortEarly: false });
    } catch (error) {
      // se não conseguir, tenta validar para o login federado (google)
      await federatedLoginScheme.validate(request.body, { abortEarly: false })
      .catch(()=>{
        // se não conseguir também, será lançado uma excessão correspondente ao
        // erro de validação do primeiro caso ( login normal )
        throw new AppError(error.name, 422, error.errors);
      });
    }
    let { email, password, firebaseToken } = request.body;
    console.log(request.body);
    const authenticateUseCase = new AuthenticateUseCase();
    let token;
    if (email && password){
      const { 
        jwt, 
        firebaseToken: _firebaseToken
      } = await authenticateUseCase.executeForLocalAuth(
        email,
        password
      );

      token = jwt;
      firebaseToken = _firebaseToken;
    }
    else{
      token = await authenticateUseCase.executeForFirebaseAuth(
        firebaseToken
      );
    }

    return response.status(200).json({
      token,
      firebaseToken
    });
  }

}

module.exports = AuthenticateController;
