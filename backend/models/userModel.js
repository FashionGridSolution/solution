const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:"String",required:true,unique:true},
        password:{type:"String",required:true},
        gender:{type:"String",required:true,default:"Male"},
        age:{type:"Number",required:true,default:20},
        shirtSize:{type:"Number",required:true,default:40},
        waistSize:{type:"Number",required:true,default:32},
        shoeSize:{type:"Number",required:true,default:9},
        pic:{
            type:"String",
            required:true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        clickedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        isAdmin:{
            type:Boolean,
            required:true,
            default:false,
        }
    },
    {timestamps:true}
)

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const User=mongoose.model("User",userSchema);
module.exports=User;