import mongoose from "mongoose"

const User = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide a username"],
        unique:true,
        },
        email:{
            type:String,
            required:[true,"Please provide a password"],
            unique:true,
        },
        password:{
          type:String,
          required:[true, "Please provide a password"],
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        isVerified:{
            type:Boolean,
            default:false 
        }
  
})
const UserSchema= mongoose.models.users || mongoose.model("users", User);
export default UserSchema;
