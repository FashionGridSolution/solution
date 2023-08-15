const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userInteractionSchema=mongoose.Schema(
    {
        //map objectid -score //5- buy 1-click 3- add to cart
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
        action:{type:"Number"}, //click, buy, add to cart
        //date of action
        dateScore:{type:Number}
    },
        {timestamps:true}
);

userInteractionSchema.methods.getDateScore=function(){
    const today = new Date();
    const yearBeginning = new Date(today.getFullYear(), 0, 1); // January 1st of the current year

    const daysPassed = Math.floor((today - yearBeginning) / (1000 * 60 * 60 * 24));
    const yearDays = this.isLeapYear(today.getFullYear()) ? 366 : 365;

    const score = daysPassed / yearDays;
    return score;
}

userInteractionSchema.methods.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const UserInteraction=mongoose.model("UserInteraction",userInteractionSchema); 
module.exports=UserInteraction;