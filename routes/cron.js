const cron = require('node-cron');
const userModel = require('../models/user');

const membershipExpiryTask = cron.schedule('0 0 0 * * *', () => {
        membershipExpiry();
        membershipExpiryTask.stop();
})

function membershipExpiry() {
    try{
        userModel.updateMany({expiry : Date.now()}, {isPremium : false})
        console.log("EXECUTED")
    }catch(err){
        console.log("CRON ERROR---->>>",err)
    }
}