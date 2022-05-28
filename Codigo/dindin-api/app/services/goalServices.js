const { Op, Sequelize } = require("sequelize");
const Goal = require("../models/Goal");
const WalletServices = require("./walletServices");

module.exports = class GoalService{

    async updateAchievemetWalletGoals(...walletIds){
        try {
            console.log("verifying and updating achievemet wallet goals");
            
            const goals = await Goal.findAll({
                where: {
                    wallet_id: [...walletIds],
                    status: "PENDING",
                    type: "A"
                }
            });
    
            const walletCurrentValueMap = new Map(); // (walletId) => walletCurrentValue
            const goalToUpdateArray = []; // [ id ]
    
            const fillGoalsArrayPromise = goals.map( async (goal) => {
                const walletCurrentValue = await getWalletCurrentValueInMap(walletCurrentValueMap, goal.wallet_id);
                if (walletCurrentValue >= goal.value){
                    goalToUpdateArray.push( goal.id );
                }
            });
    
            await Promise.all(fillGoalsArrayPromise);
    
            if (goalToUpdateArray.length > 0){
                await Goal.update({
                    status: "FINISHED"
                }, {
                    where: {
                        id: goalToUpdateArray
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateExpiredGoals(){
        try {
            console.log("verifying and updatig expired goals");
            const goals = await Goal.findAll({
                where: {
                    status: "PENDING",
                    expire_at: {
                        [Op.lte]: Sequelize.literal("NOW()"),
                    },
                }
            });
    
            const walletCurrentValueMap = new Map(); // (walletId) => walletCurrentValue
            const finishedGoalsArray = []; // [ id ]
            const lostGoalsArray = []; // [ id ]
    
            const fillGoalsArraysPromise = goals.map( async (goal) => {
                const walletCurrentValue = await getWalletCurrentValueInMap(walletCurrentValueMap, goal.wallet_id);
                if (walletCurrentValue >= goal.value)
                    finishedGoalsArray.push( goal.id );
                else
                    lostGoalsArray.push( goal.id );
            });
    
            await Promise.all(fillGoalsArraysPromise);
    
            const updateGoalPromiseArray = [];
            if (finishedGoalsArray.length > 0){
                const updateFinishedGoalsPromise = Goal.update({
                    status: "FINISHED"
                },{
                    where: {
                        id: finishedGoalsArray
                    }
                });
                updateGoalPromiseArray.push(updateFinishedGoalsPromise);
            }
            if (lostGoalsArray.length > 0){
                const updateLostGoalsPromise = Goal.update({
                    status: "LOST"
                },{
                    where: {
                        id: lostGoalsArray
                    }
                });
                updateGoalPromiseArray.push(updateLostGoalsPromise);
            }
    
            await Promise.all(updateGoalPromiseArray);
        } catch (error) {
            console.log("Failed to update expired goals: ")
            console.log(error);
        }

    }
}

async function getWalletCurrentValueInMap(walletCurrentValueMap, wallet_id){
    let walletCurrentValue;

    if (walletCurrentValueMap.has(wallet_id)){
        walletCurrentValue = walletCurrentValueMap.get(wallet_id)
    }
    else{
        const walletServices = new WalletServices();
        walletCurrentValue = await walletServices.getWalletCurrentValue(wallet_id); // get wallet current value
        walletCurrentValueMap.set(wallet_id, walletCurrentValue);
    }

    console.log(walletCurrentValue);
    return walletCurrentValue;
}