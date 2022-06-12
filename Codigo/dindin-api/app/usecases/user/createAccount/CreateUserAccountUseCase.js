// ! const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AppError = require("../../../errors/AppError");
const User = require("../../../models/User");

class CreateUserAccountUseCase {
    async create(name, email, password) {
        const usedEmail = await User.findOne({
            where: {
                email: email,
            },
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );
        if (usedEmail) {
            throw new AppError("'email' already used", 409);
        }

        const bcryptPassword = bcrypt.hashSync(password, 8);
        const user = await User.create({
            name,
            email,
            password: bcryptPassword,
        }).catch(
            /* istanbul ignore next */ (error) => {
                throw new AppError(error.message, 500, error);
            }
        );
        return { id: user.id };
    }
}

module.exports = CreateUserAccountUseCase;
