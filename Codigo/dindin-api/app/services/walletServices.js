const { Sequelize } = require("sequelize");
const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");

module.exports = class WalletServices{
    async getWalletCurrentValue(wallet_id){
        const transactionsWalletBalance = await Transaction.findAll({
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
        const wallet = await Wallet.findByPk(wallet_id);
        
        return wallet.initial_value + (transactionsWalletBalance[0].dataValues.incoming??0) - (transactionsWalletBalance[0].dataValues.outcoming??0);
    }
}