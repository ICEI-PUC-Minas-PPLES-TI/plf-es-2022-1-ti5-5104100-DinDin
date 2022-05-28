const cron = require("node-cron");
const { Op, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { EVERY_DAY_03AM,/* EVERY_MINUTE, EVERY_SECOND*/ } = require("./scheduleConstants");

const TransactionRecurrencies = require("../models/TransactionRecurrencies");
const Transaction = require("../models/Transaction");
const GoalService = require("../services/goalServices");

const generateTransactions = cron.schedule(EVERY_DAY_03AM, async () => {
    console.log("cronjob running ")
    /*
          SELECT *
          FROM `transaction_recurrencies` AS `TransactionRecurrencies`
          WHERE (`TransactionRecurrencies`.`deleted_at` IS NULL
            AND (((`TransactionRecurrencies`.`expired_at` IS NULL
                  OR `TransactionRecurrencies`.`expired_at` >= NOW())
                AND `TransactionRecurrencies`.`interval` = 'M'
                AND `TransactionRecurrencies`.`day` = DAY(NOW()))
                OR ((`TransactionRecurrencies`.`expired_at` IS NULL
                    OR `TransactionRecurrencies`.`expired_at` >= NOW())
                    AND `TransactionRecurrencies`.`interval` = 'D')));
        */
    const unexpiredTransactionsR = await TransactionRecurrencies.findAll({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        {
                            expired_at: {
                                [Op.or]: {
                                    [Op.eq]: null,
                                    [Op.gte]: Sequelize.literal("NOW()"),
                                },
                            },
                        },
                        {
                            interval: {
                                [Op.eq]: "M",
                            },
                        },
                        {
                            day: {
                                [Op.eq]: Sequelize.literal("DAY(NOW())"),
                            },
                        },
                    ],
                },
                {
                    [Op.and]: [
                        {
                            expired_at: {
                                [Op.or]: {
                                    [Op.eq]: null,
                                    [Op.gte]: Sequelize.literal("NOW()"),
                                },
                            },
                        },
                        {
                            interval: {
                                [Op.eq]: "D",
                            },
                        },
                    ],
                },
            ],
        },
    }).catch((error) => {
        console.log(error);
    });

    let transactionsToCreate = [];
    const walletWithNewTrasactionsSet = new Set(); // [ id ]

    for (const transactionRecurrency of unexpiredTransactionsR) {
        const transactionToCreate = {
            id: uuidv4(),
            wallet_id: transactionRecurrency.wallet_id,
            user_id: transactionRecurrency.user_id,
            description: transactionRecurrency.description,
            value: transactionRecurrency.value,
            date: new Date(),
            category_id: transactionRecurrency.category_id,
            transaction_recurrencies_id: transactionRecurrency.id,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };
        transactionsToCreate.push(transactionToCreate);
        walletWithNewTrasactionsSet.add(transactionRecurrency.wallet_id);
    }

    await Transaction.bulkCreate(transactionsToCreate)
        .then(function () {
            console.log("Transactions have been created by cronjob");
        })
        .catch(function (error) {
            console.log(error);
        });

    const goalService = new GoalService();
    
    // put it that here because it necessaryly has to run after recurrent transactions are registered
    await goalService.updateAchievemetWalletGoals(...walletWithNewTrasactionsSet.values());

    await goalService.updateExpiredGoals();
});

module.exports = {
    async startCronJobs() {
        console.log("Cronjobs stated");
        generateTransactions.start();
    },
};
