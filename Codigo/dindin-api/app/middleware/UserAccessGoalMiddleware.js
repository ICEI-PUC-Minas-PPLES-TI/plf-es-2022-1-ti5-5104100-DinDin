const AppError = require("../errors/AppError");
const Goal = require("../models/Goal");
const UserHasWallet = require("../models/UserHasWallet");

const verifyGoalPermission = async (request, response, next) => {
    const goalId = request.params.id;
    const goal = await Goal.findByPk(goalId);

    if (!goal) {
        throw new AppError("This goal does not exists", 404);
    }
    const { wallet_id } = goal;

    const user = await UserHasWallet.findOne({
        where: {
            user_id: request.userId,
            wallet_id,
        },
    }).catch(
        /* istanbul ignore next */ (error) => {
            throw new AppError(error.message, 500, error);
        }
    );
    if (user) next();
    else throw new AppError("User does not have this goal permission", 403);
};

const jwtAuthorization = {
    verifyGoalPermission,
};

module.exports = jwtAuthorization;
