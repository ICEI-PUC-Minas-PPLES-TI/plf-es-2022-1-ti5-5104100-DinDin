const yup = require("yup");

const AppError = require("../../../errors/AppError");
const InviteWalletUseCase = require("./InviteWalletUseCase");

class InviteWalletController {
    async invite(request, response) {
        const { id } = request.params;

        const inviteWalletUseCase = new InviteWalletUseCase();
        const invite = await inviteWalletUseCase.invite(id, request.userId);

        return response.status(201).json({
            invite,
        });
    }

    async accept(request, response) {
        const scheme = yup.object().shape({
            code: yup
                .string("'code' must be string!")
                .max(8)
                .required("'code' is a required field"),
        });

        try {
            await scheme.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError(error.name, 422, error.errors);
        }

        const { code } = request.body;

        const inviteWalletUseCase = new InviteWalletUseCase();
        const invite = await inviteWalletUseCase.accept(code, request.userId);

        return response.status(201).json({
            invite,
        });
    }
}

module.exports = InviteWalletController;
