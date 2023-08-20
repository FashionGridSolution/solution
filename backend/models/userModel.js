const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:"String",required:true,unique:true},
        password:{type:"String",required:true},
        gender:{type:"String",required:true,default:"M"},
        age:{type:"Number",required:true,default:20},
        city:{type:"String",required:true,default:"Mumbai"},
        chestSize:{type:"Number",required:true,default:40},
        hipSize:{type:"Number",required:true,default:32},
        footSize:{type:"Number",required:true,default:9},
        pic:{
            type:"String",
            required:true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        clickedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
        searchedProducts: [ String],
        isAdmin:{
            type:Boolean,
            required:true,
            default:false,
        },
        userInteractions:[{type:mongoose.Schema.Types.ObjectId,ref:'UserInteraction'}],
        cartId:{type:mongoose.Schema.Types.ObjectId,ref:'Cart'},
        userID:"Number"
    },
    {timestamps:true}
)

userSchema.methods.matchPassword=async function(enteredPassword){
    return (enteredPassword===this.password);
    // return await bcrypt.compare(enteredPassword,this.password);
}
// userSchema.pre("save", async function (next) {
//     if (!this.isModified) {
//       next();
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });

const User=mongoose.model("User",userSchema);
module.exports=User;