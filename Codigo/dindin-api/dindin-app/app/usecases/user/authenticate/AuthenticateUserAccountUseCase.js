const bcrypt = require("bcryptjs");
const jwtAuthorization = require("../../../routes/jwtAuthorization");

const AppError = require("../../../errors/AppError");
const User = require("../../../models/User");

class AuthenticateUserAccountUseCase {
    async login(email, password) {
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
        return jwtAuthorization.logIn(user.id);
    }
}

module.exports = AuthenticateUserAccountUseCase;
