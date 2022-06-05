const { Sequelize } = require("sequelize");
const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");

module.exports = class WalletServices {
    async getWalletCurrentValue(wallet_id) {
        const transactionsWalletBalance = await Transaction.findOne({
            attributes: [
                [
                    Sequelize.literal(
                        `SUM(CASE WHEN value > 0 THEN value ELSE 0 END)`
                    ),
                    "incoming",
                ],
                [
                    Sequelize.literal(
                        `ABS(SUM(CASE WHEN value < 0 THEN value ELSE 0 END))`
                    ),
                    "outcoming",
                ],
            ],
            where: {
                wallet_id,
            },
        });

        return (
            (transactionsWalletBalance.dataValues.incoming ?? 0) -
            (transactionsWalletBalance.dataValues.outcoming ?? 0)
        );
    }
};
