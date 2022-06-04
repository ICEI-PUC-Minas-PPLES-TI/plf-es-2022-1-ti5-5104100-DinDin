// ! const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AppError = require("../../../errors/AppError");
const User = require("../../../models/User");
const FindUserAccountUseCase = require("../findAccount/FindUserAccountUseCase");

class UpdateUserAccountUseCase {
    async update(id, name, password, oldPassword) {
        const findUserAccountUseCase = new FindUserAccountUseCase();
        await findUserAccountUseCase.find(id);

        let user = await User.scope("withPassword").findByPk(id);

        let bcryptPassword;
        if (password) {
            if (!oldPassword)
                throw new AppError(
                    "Current password is required when changing the password!",
                    409
                );
            else if (!(await bcrypt.compare(oldPassword, user.password)))
                throw new AppError("The current password is wrong!", 409);
            bcryptPassword = await bcrypt.hash(password, 8);
        }
        await user
            .update({
                name,
                password: bcryptPassword ? bcryptPassword : user.password,
            })
            .catch((error) => {
                throw new AppError(error.message, 500, error);
            });
        user = await User.findByPk(id);
        return user;
    }
}

module.exports = UpdateUserAccountUseCase;
