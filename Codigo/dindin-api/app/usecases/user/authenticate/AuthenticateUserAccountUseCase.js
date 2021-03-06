const bcrypt = require("bcryptjs");
const AuthenticationMiddleware = require("../../../middleware/AuthenticationMiddleware");
const { firebaseServices } = require("../../../services/firebaseServices");

const AppError = require("../../../errors/AppError");
const User = require("../../../models/User");

class AuthenticateUserAccountUseCase {
    // ver como vai ser estruturado isso, se vai ser necessário
    // criar outro arquivo ou algo do tipo
    async executeForLocalAuth(email, password) {
        const user = await User.scope("withPassword").findOne({
            where: { email },
            attributes: {
                include: "password",
            },
        });

        if (!user)
            throw new AppError(
                "Não existe usuário com esse e-mail cadastrado o sistema",
                401
            );

        const arePasswordsEqual = await bcrypt.compare(
            password,
            user.dataValues.password
        );
        if (!arePasswordsEqual) throw new AppError("Senha incorreta!", 401);

        // gerar jwt
        const jwt = AuthenticationMiddleware.logIn(user.id);
        const firebaseToken = await firebaseServices.generateFirebaseAuthToken(
            user.id
        );

        return {
            jwt,
            firebaseToken,
            userId: user.id,
        };
    }

    async executeForFirebaseAuth(firebaseToken) {
        let firebaseId;
        try {
            firebaseId = await firebaseServices.getFirebaseIdByToken(
                firebaseToken
            );
        } catch (error) {
            throw new AppError(
                "Não foi possível fazer login com entidade federada",
                401
            );
        }

        let user = await User.findOne({
            where: { firebaseId },
            attributes: {
                include: "id",
            },
        });

        if (!user) {
            const { email, displayName: name } =
                await firebaseServices.getFirebaseUserById(firebaseId);

            user = await User.create({
                name,
                email,
                firebaseId,
            }).catch(
                /* istanbul ignore next */ (error) => {
                    throw new AppError(error.message, 500, error);
                }
            );
        }

        // gerar jwt
        return {
            jwt: AuthenticationMiddleware.logIn(user.id),
            firebaseToken,
            userId: user.id,
        };
    }
}

module.exports = AuthenticateUserAccountUseCase;
