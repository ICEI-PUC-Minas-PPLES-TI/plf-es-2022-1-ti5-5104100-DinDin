const { Op } = require("sequelize");

const AppError = require("../../../errors/AppError");
const UserHasWallet = require("../../../models/UserHasWallet");
const WalletInvite = require("../../../models/WalletInvite");
const UpdateWalletUseCase = require("../updateWallet/UpdateWalletUseCase");
const { firebaseServices } = require("../../../services/firebaseServices");

class InviteWalletUseCase {
    /**
     * Generates a code for another user join a wallet
     * @param {*} walletId
     * @param {*} userID
     * @returns
     */
    async invite(walletId, userID) {
        let dt2 = new Date();
        dt2.setDate(new Date().getDate() + 1);

        const invite = await WalletInvite.create({
            wallet_id: walletId,
            user_id: userID,
            code: this.makeid(8),
            expire_at: this.formatDate(dt2),
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        return invite;
    }

    /**
     * Adds another user into wallet by invite code
     * @param {*} code
     * @param {*} userId
     */
    async accept(code, userId) {
        let date = new Date();
        const invite = await WalletInvite.findOne({
            where: {
                code,
                expire_at: {
                    [Op.gte]: this.formatDate(date),
                },
            },
        }).catch((error) => {
            throw new AppError(error.message, 500, error);
        });

        if (!invite)
            throw new AppError(
                "Invite does not exists or it already expired",
                405
            );
        else if (invite.user_id == userId)
            throw new AppError("You cant accept your own invite!", 405);
        else {
            const userHasWallet = await UserHasWallet.create({
                wallet_id: invite.wallet_id,
                user_id: userId,
            }).catch((error) => {
                throw new AppError(error.message, 500, error);
            });
            const updateWalletUseCase = new UpdateWalletUseCase();
            updateWalletUseCase.update(invite.wallet_id, null, true);

            /*
             await firebaseServices.
            */
            // Will be replaced by walled admin afterwards
            const firstuser = await UserHasWallet.findOne({
                where: {
                    wallet_id: invite.wallet_id,
                },
                order: [["created_at", "ASC"]],
            });

            await firebaseServices.sendCloudMessage(
                firstuser.user_id,
                "Invite Accepted",
                "A new user has joined your wallet"
            );

            // Needs to send to others users a notification that a user has joined their wallet
            return userHasWallet;
        }
    }

    /**
     * Generates random length string
     * @param {*} length
     * @returns
     */
    makeid(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    formatDate(date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")} ${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
    }
}

module.exports = InviteWalletUseCase;
